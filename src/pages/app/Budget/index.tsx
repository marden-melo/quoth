import { Sidebar } from '../Sidebar';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Content,
  Title,
  Form,
  SectionTitle,
  FormRow,
  FormRowBottom,
  FormRowCustom,
  FormRowThird,
  TitleValidit,
  FormRowHalf,
  Table,
  ValueText,
  InstallmentsInfo,
  BonusSection,
} from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { TextArea } from '@/components/TextArea';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { formatPercentage } from '@/utils/masks/formatPercentage';
import { formatCurrency } from '@/utils/masks/formatCurrency';

interface BudgetFormData {
  client: string;
  service: string;
  quantity: number;
  value: number;
  date: string;
  description: string;
  status: string;
  paymentMethod: string;
  discount: number;
  surcharge: number;
  validity: string;
  responsible: string;
  dueDate: string;
  address: string;
  notes: string;
  budgetNumber: string;
  installments: number;
  fees: number;
  email: string;
  attachments: FileList;
  bonusDescription: string;
  bonusValue: number;
  bonusPercents: number;
  items: string[];
  selectedBonuses: string[];
}

interface IClient {
  id: string;
  fullName: string;
}

interface IProductServices {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IBonus {
  id: string;
  description: string;
  type: 'percentage' | 'value';
  value: number;
  percentage: number;
}

export function Budget() {
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<BudgetFormData>();
  const [clients, setClients] = useState<IClient[]>([]);
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const [selectedBonus, setSelectedBonus] = useState(0);
  const [selectedBonuses, setSelectedBonuses] = useState<IBonus[]>([]);
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isProductServiceOpen, setIsProductServiceOpen] = useState(false);

  const [productsServices, setProductsServices] = useState<IProductServices[]>(
    []
  );
  const [selectedService, setSelectedService] =
    useState<IProductServices | null>(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients');
        setClients(response.data.data);
      } catch (error) {
        toast.error('Erro ao carregar clientes');
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProductsServices = async () => {
      try {
        const response = await api.get('/products-or-services');
        setProductsServices(response.data.data);
      } catch (error) {
        toast.error('Erro ao carregar produtos ou serviços');
      }
    };
    fetchProductsServices();
  }, []);

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await api.get('/bonuses');

        const validBonuses = response.data.data.filter(
          (bonus: IBonus) => bonus.id && bonus.description
        );
        const formattedBonuses = validBonuses.map((bonus: IBonus) => ({
          ...bonus,
          value:
            bonus.type === 'percentage'
              ? formatPercentage(bonus.value)
              : formatCurrency(bonus.value),
        }));
        console.log('BONUS:', formattedBonuses);
        setBonuses(formattedBonuses);
      } catch (error) {
        toast.error('Erro ao carregar bônus');
      }
    };
    fetchBonuses();
  }, []);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd', { locale: ptBR });
    setValue('date', today);
  }, [setValue]);

  useEffect(() => {
    const today = new Date();
    const validityDate = new Date(today);
    validityDate.setDate(today.getDate() + 7);
    const formattedDate = format(validityDate, 'yyyy-MM-dd', { locale: ptBR });
    setValue('validity', formattedDate);
  }, [setValue]);

  const toggleBonusSection = () => {
    setIsBonusOpen(!isBonusOpen);
  };

  const toggleProductServicesSection = () => {
    setIsProductServiceOpen(!isProductServiceOpen);
  };

  const updateTotalValue = (updatedBonuses: IBonus[]) => {
    const newBonusTotal = calculateBonusTotal(updatedBonuses);
    setSelectedBonus(newBonusTotal);
  };

  const addBonus = (bonus: IBonus) => {
    if (bonus && bonus.id && !selectedBonuses.find((b) => b.id === bonus.id)) {
      setSelectedBonuses((prev) => {
        const updatedBonuses = [...prev, bonus];
        updateTotalValue(updatedBonuses);
        return updatedBonuses;
      });
    }
  };

  const removeBonus = (bonusId: string) => {
    setSelectedBonuses((prev) => {
      const updatedBonuses = prev.filter((bonus) => bonus.id !== bonusId);
      updateTotalValue(updatedBonuses);
      return updatedBonuses;
    });
  };

  const applyBonus = (totalValue: number) => {
    let valueWithBonus = totalValue;

    selectedBonuses.forEach((bonus) => {
      if (bonus.type === 'percentage') {
        valueWithBonus -= (totalValue * bonus.value) / 100;
      } else if (bonus.type === 'value') {
        valueWithBonus -= bonus.value;
      }
    });

    return valueWithBonus;
  };

  const handleServiceChange = (serviceId: string) => {
    const service = productsServices.find((ps) => ps.id === serviceId);
    if (service) {
      setSelectedService(service);
      setValue('value', service.price);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (selectedService) {
      const totalValue = selectedService.price * quantity;
      setValue('value', totalValue);
    }
  };

  const calculateBonusTotal = (updatedBonuses: IBonus[]) => {
    return updatedBonuses.reduce((total, bonus) => {
      if (bonus.type === 'percentage') {
        return total + (bonus.value / 100) * total;
      } else {
        return total + bonus.value;
      }
    }, 0);
  };

  const totalBonus = calculateBonusTotal(selectedBonuses);
  const formattedTotalBonus =
    typeof totalBonus === 'number' ? totalBonus.toFixed(2) : '0.00';

  const onSubmit = (data: BudgetFormData) => {
    console.log('Formulário Enviado:', data);
    toast.success('Orçamento salvo com sucesso!');
    reset();
  };

  const handleCancel = () => {
    reset();
    toast.info('Edição de orçamento cancelada.');
  };

  const value = watch('value');
  const discount = watch('discount');
  const surcharge = watch('surcharge');
  const fees = watch('fees');
  const installments = watch('installments');

  const paymentMethod = watch('paymentMethod');

  const finalValue = value
    ? applyBonus(value) -
      (value * (discount || 0)) / 100 +
      (value * (surcharge || 0)) / 100
    : 0;

  const totalWithFees =
    fees && fees > 0 ? finalValue + (finalValue * fees) / 100 : finalValue;

  const installmentValue =
    installments && installments > 0 ? totalWithFees / installments : 0;

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Criar Orçamento</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Dados do orçamento */}
          <FormRow>
            <Controller
              name="budgetNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Nº do Orçamento" required />
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Data de Emissão"
                  type="date"
                  required
                />
              )}
            />
          </FormRow>
          {/* Seção Cliente */}
          <SectionTitle>Cliente</SectionTitle>
          <FormRowThird>
            <Controller
              name="client"
              control={control}
              render={({ field }) => (
                <Select {...field} required>
                  <option value="">Selecione um Cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.fullName}
                    </option>
                  ))}
                </Select>
              )}
            />
            <Button type="button">Cadastrar um Cliente</Button>
          </FormRowThird>
          {/* Seção Produtos e Serviços */}
          <SectionTitle>Produtos e Serviços</SectionTitle>
          <FormRow>
            <Button type="button" onClick={toggleProductServicesSection}>
              {isProductServiceOpen
                ? 'Fechar Produtos e Serviços'
                : 'Adicionar Produtos e Serviços'}
            </Button>
          </FormRow>
          {isProductServiceOpen && (
            <>
              <FormRowThird>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      required
                      onChange={(e) => {
                        field.onChange(e);
                        handleServiceChange(e.target.value);
                      }}
                    >
                      <option value="">Selecione um Produto ou Serviço</option>
                      {productsServices.map((ps) => (
                        <option key={ps.id} value={ps.id}>
                          {ps.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Quantidade"
                      type="number"
                      min="1"
                      required
                      onChange={(e: any) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                    />
                  )}
                />
              </FormRowThird>
              <SectionTitle>Detalhes do Orçamento</SectionTitle>
              <FormRow>
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ? formatCurrency(field.value) : ''}
                      placeholder="Valor (R$)"
                      required
                      readOnly
                    />
                  )}
                />
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Desconto (%)"
                      type="number"
                      min="0"
                      max="100"
                    />
                  )}
                />
              </FormRow>
              <FormRow>
                <Controller
                  name="surcharge"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Acréscimo (%)"
                      type="number"
                      min="0"
                      max="100"
                    />
                  )}
                />
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} required>
                      <option value="">Selecione um Método de Pagamento</option>
                      <option value="PIX">PIX</option>
                      <option value="CASH">DINHEIRO</option>
                      <option value="BOLETO">BOLETO BANCÁRIO</option>
                      <option value="BANK_TRANSFER">
                        TRANSFERÊNCIA ENTRE CONTAS
                      </option>
                      <option value="CREDIT_CARD">CARTÃO DE CRÉDITO</option>
                      <option value="DEBIT_CARD">CARTÃO DE DÉBITO</option>
                    </Select>
                  )}
                />
              </FormRow>
              {/* Seção de Parcelamento */}
              {(paymentMethod === 'CREDIT_CARD' ||
                paymentMethod === 'BOLETO') && (
                <FormRow>
                  <Controller
                    name="installments"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Nº de parcelas"
                        type="number"
                        min="1"
                      />
                    )}
                  />
                  <Controller
                    name="fees"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Taxa do Parcelamento (%)"
                        type="number"
                        min="0"
                      />
                    )}
                  />
                </FormRow>
              )}
            </>
          )}

          {/* Seção de Bônus */}
          <SectionTitle>Bônus</SectionTitle>
          <FormRow>
            <Button type="button" onClick={toggleBonusSection}>
              {isBonusOpen ? 'Fechar Bônus' : 'Adicionar Bônus'}
            </Button>
          </FormRow>
          {isBonusOpen && (
            <>
              <FormRow>
                <Controller
                  name="bonusDescription"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        const selected = bonuses.find(
                          (bonus) => bonus.id === e.target.value
                        );
                        if (selected) {
                          addBonus(selected);
                        }
                      }}
                    >
                      <option value="">Selecione um Bônus</option>
                      {bonuses.map((bonus) => (
                        <option key={bonus.id} value={bonus.id}>
                          {bonus.description}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormRow>

              {/* Exibição dos bônus selecionados */}
              <Table>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Desconto</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBonuses.map((bonus) => (
                    <tr key={bonus.id}>
                      <td>{bonus.description}</td>
                      <td>
                        {bonus.type === 'percentage' ? 'Valor' : 'Porcentagem'}
                      </td>
                      <td>
                        {bonus.type === 'percentage'
                          ? `${bonus.value}%`
                          : ` ${bonus.percentage}%`}
                      </td>
                      <td>
                        <Button
                          type="button"
                          onClick={() => removeBonus(bonus.id)}
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          <FormRowCustom>
            <BonusSection>
              <ValueText>Total de Bônus: R$ {formattedTotalBonus}</ValueText>
            </BonusSection>
          </FormRowCustom>

          <FormRowCustom>
            <BonusSection>
              <ValueText>
                Valor Final (com Bônus): R$ {totalWithFees.toFixed(2)}
              </ValueText>
            </BonusSection>
          </FormRowCustom>

          {installments > 0 && (
            <>
              <FormRow>
                <strong>Parcelas: {installments}</strong>
                <InstallmentsInfo>
                  Valor das Parcelas: R$ {installmentValue.toFixed(2)}
                </InstallmentsInfo>
              </FormRow>
            </>
          )}

          <FormRowCustom>
            <BonusSection>
              <ValueText>Valor Final: R$ {totalWithFees.toFixed(2)}</ValueText>
            </BonusSection>
          </FormRowCustom>

          <FormRowHalf>
            <TitleValidit>Data de Validade do Orçamento</TitleValidit>
            <Controller
              name="validity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Selecione a data de validade"
                  type="date"
                  required
                />
              )}
            />
            <Controller
              name="responsible"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Nome do Responsável" required />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email do Responsável"
                  required
                  type="email"
                />
              )}
            />
          </FormRowHalf>

          <SectionTitle>Outros Detalhes</SectionTitle>
          <FormRowCustom>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Data de Vencimento"
                  type="date"
                />
              )}
            />
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextArea {...field} placeholder="Notas" />
              )}
            />
          </FormRowCustom>

          <FormRowBottom>
            <Button type="submit" backgroundColor={theme['cyen-700']}>
              Salvar
            </Button>
            <Button
              type="button"
              backgroundColor={theme['gray-500']}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </FormRowBottom>
        </Form>
      </Content>
    </Container>
  );
}
