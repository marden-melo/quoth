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
  HeaderContainer,
  IconButton,
  CalculatedValuesSection,
  BonusSectionWrapper,
  PaymentMethodBox,
  StyledTextarea,
  AttachmentTable,
} from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { TextArea } from '@/components/TextArea';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { formatCurrency } from '@/utils/masks/formatCurrency';
import { Minus, Plus, Trash } from 'phosphor-react';
import { IBonus, useBonuses } from '@/utils/requests/fetchBonuses';
import { IClient, useClients } from '@/utils/requests/fetchClients';
import {
  IProductServices,
  useProductsServices,
} from '@/utils/requests/fetchProductServices';
import { BudgetFormData } from './DTO/budgetFormDataDTO';
import { PaymentMethod, paymentMethodLabels } from './DTO/paymentMethodDTO';
import { api } from '@/lib/axios';

interface User {
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  planId: string | null;
  roleId: string;
  testStartDate: string | null;
  avatar: string | null;
}

interface UserData {
  user: User;
}

export function Budget() {
  const { handleSubmit, control, reset, watch, setValue, getValues } =
    useForm<BudgetFormData>({
      defaultValues: {
        paymentMethod: '',
      },
    });
  const [clients, setClients] = useState<IClient[]>([]);
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const [selectedBonuses, setSelectedBonuses] = useState<IBonus[]>([]);
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isProductServiceOpen, setIsProductServiceOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [productsServices, setProductsServices] = useState<IProductServices[]>(
    []
  );
  const [selectedService, setSelectedService] =
    useState<IProductServices | null>(null);
  const [selectedItems, setSelectedItems] = useState<IProductServices[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = useTheme();

  const { fetchBonuses } = useBonuses();
  const { fetchClients } = useClients();
  const { fetchProductsServices } = useProductsServices();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/me');
        const data: UserData = response.data;
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const bonusesData = await fetchBonuses();
        setBonuses(bonusesData);

        const clientsData = await fetchClients();
        setClients(clientsData);

        const productsServicesData = await fetchProductsServices();
        setProductsServices(productsServicesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd', { locale: ptBR });
    setValue('date', today);

    const validityDate = new Date();
    validityDate.setDate(validityDate.getDate() + 7);
    setValue('validity', format(validityDate, 'yyyy-MM-dd', { locale: ptBR }));
  }, [setValue]);

  const toggleBonusSection = useCallback(() => {
    const discount = getValues('discount');

    if (discount && discount > 0) {
      toast.error('Desconto já aplicado. Não é possível adicionar bônus.');
      return;
    }

    setIsBonusOpen((prev) => !prev);
  }, [getValues]);

  const toggleProductServicesSection = () => {
    setIsProductServiceOpen(!isProductServiceOpen);
  };

  const togglePaymentSection = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };

  const calculateTotalBonusPercentage = () => {
    return selectedBonuses.reduce((total, bonus) => {
      if (bonus.type === 'percentage') {
        return total + bonus.percentage;
      }
      return total;
    }, 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const removeAttachment = (index: any) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateFinalValues = useCallback(() => {
    const totalProducts = selectedItems.reduce((sum, item) => {
      const itemDiscount = item.discount || 0;
      const itemSurcharge = item.surcharge || 0;
      const itemTotal = item.price * item.quantity;
      const itemTotalWithAdjustments =
        itemTotal * (1 - itemDiscount / 100) * (1 + itemSurcharge / 100);
      return sum + itemTotalWithAdjustments;
    }, 0);

    const totalWithBonuses = selectedBonuses.reduce((total, bonus) => {
      if (bonus.type === 'percentage') {
        return total - (total * bonus.percentage) / 100;
      } else {
        return total - bonus.value;
      }
    }, totalProducts);

    const selectedFees = selectedPaymentMethods?.[0]?.fees || 0;

    const totalWithFees =
      selectedFees > 0
        ? totalWithBonuses + (totalWithBonuses * selectedFees) / 100
        : totalWithBonuses;

    const totalBonusesDiscountFees =
      selectedFees > 0 ? totalWithBonuses : totalWithBonuses;

    const finalValue = totalWithFees;

    const finalValueWithInstallments =
      selectedPaymentMethods.length > 0 &&
      selectedPaymentMethods[0].installments
        ? finalValue + selectedFees / 100
        : finalValue;

    return {
      totalProducts: totalProducts.toFixed(2),
      totalWithBonuses: totalWithBonuses.toFixed(2),
      totalWithFees: totalWithFees.toFixed(2),
      finalValue: finalValue.toFixed(2),
      finalValueWithInstallments: finalValueWithInstallments.toFixed(2),
      totalBonusesDiscountFees: totalBonusesDiscountFees.toFixed(2),
    };
  }, [selectedItems, selectedBonuses, selectedPaymentMethods]);

  const updateTotalValues = useCallback(() => {
    const { totalProducts, totalWithBonuses, totalWithFees } =
      calculateFinalValues();

    setValue('totalProducts', totalProducts);
    setValue('totalWithBonuses', Number(totalWithBonuses));
    setValue('totalWithFees', totalWithFees);
  }, [setValue, calculateFinalValues]);

  const addBonus = useCallback(
    (bonus: IBonus) => {
      if (
        bonus &&
        bonus.id &&
        !selectedBonuses.find((b) => b.id === bonus.id)
      ) {
        setSelectedBonuses((prev) => {
          const updatedBonuses = [...prev, bonus];
          updateTotalValues();
          return updatedBonuses;
        });
      }
    },
    [selectedBonuses, updateTotalValues]
  );

  const removeBonus = useCallback(
    (bonusId: string) => {
      setSelectedBonuses((prev) => {
        const updatedBonuses = prev.filter((bonus) => bonus.id !== bonusId);
        updateTotalValues();
        return updatedBonuses;
      });
    },
    [updateTotalValues]
  );

  const addProductService = useCallback(
    (service: IProductServices, quantity: number) => {
      if (service && quantity > 0) {
        if (selectedItems.some((item) => item.id === service.id)) {
          return;
        }

        const discount = watch('discount') || 0;
        const surcharge = watch('surcharge') || 0;

        const newItem = {
          ...service,
          quantity,
          totalValue:
            service.price *
            quantity *
            (1 - discount / 100) *
            (1 + surcharge / 100),
          unitValue: service.price,
          discount,
          surcharge,
        };

        setSelectedItems((prev) => {
          const updatedItems = [...prev, newItem];
          return updatedItems;
        });

        updateTotalValues();

        setSelectedService(null);
        setValue('quantity', 1);
        setValue('service', '');
        setValue('discount', '');
        setValue('surcharge', '');
        setValue('unitValue', 0);
        setValue('value', 0);
      }
    },
    [selectedItems, watch, setSelectedItems, setValue, updateTotalValues]
  );

  const addPaymentMethod = () => {
    const method = watch('paymentMethod') as keyof typeof paymentMethodLabels;
    const installments = watch('installments');
    const fees = watch('fees');
    const observation = watch('observation');

    if (!method) {
      toast.error('Por favor, selecione um método de pagamento.');
      return;
    }

    if (
      (method === 'BOLETO' || method === 'CREDIT_CARD') &&
      (!installments || installments <= 0)
    ) {
      toast.error('Por favor, informe o número de parcelas.');
      return;
    }

    if (fees < 0) {
      toast.error('As taxas não podem ser negativas.');
      return;
    }

    const newPaymentMethod: PaymentMethod = {
      id: Math.random().toString(),
      paymentMethod: method,
      installments: installments > 0 ? installments : undefined,
      fees,
      observation: observation || undefined,
    };

    setSelectedPaymentMethods((prev) => [...prev, newPaymentMethod]);

    setValue('paymentMethod', '');
    setValue('installments', '');
    setValue('fees', '');
    setValue('observation', '');
  };

  const removeProductService = (serviceId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== serviceId));
  };

  const handleServiceChange = (serviceId: string) => {
    const service = productsServices.find((ps) => ps.id === serviceId);
    if (service) {
      setSelectedService(service);
      setValue('value', service.price);
      setValue('unitValue', service.price);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (selectedService) {
      const totalValue = selectedService.price * quantity;
      setValue('value', totalValue);
    }
  };

  const onSubmit = async (data: BudgetFormData) => {
    console.log('Valores do formulário:', data);
    console.log('Método de pagamento selecionado:', data.paymentMethod);
    console.log('Usuário logado:', userData);

    // Validar se um cliente foi selecionado
    if (!data.client) {
      toast.error('Por favor, selecione um cliente.');
      return;
    }

    // Validar se pelo menos um item foi adicionado
    if (selectedItems.length === 0) {
      toast.error('Por favor, adicione ao menos um produto ou serviço.');
      return;
    }

    // Validar se um método de pagamento foi selecionado
    if (selectedPaymentMethods.length === 0) {
      toast.error('Por favor, selecione um método de pagamento.');
      return;
    }

    // Verificar se os anexos foram corretamente mapeados
    const documentsPayload = attachments.map((file) => ({
      fileName: file.name,
      fileType: file.type,
      filePath: `/uploads/${file.name}`,
    }));

    const payload = {
      budgetNumber: data.budgetNumber,
      title: 'Orçamento - ' + data.budgetNumber,
      description: data.description || 'Detalhes do orçamento',
      status: 'PENDING',
      discountPercent: data.discount || 0,
      discountValue:
        (data.discount || 0) * (parseFloat(data.totalProducts) / 100),
      subTotal: parseFloat(data.totalProducts),
      total: parseFloat(data.totalWithFees),
      finalValueWithInstallments: parseFloat(
        String(data.finalValueWithInstallments || 0)
      ),
      bonusValue: parseFloat(String(data.bonusValue || 0)),
      userId: userData?.user.id,
      clientId: data.client,
      paymentType: selectedPaymentMethods[0]?.paymentMethod || 'CASH',
      installments: selectedPaymentMethods[0]?.installments || null,
      fees: selectedPaymentMethods[0]?.fees || 0,
      additionalNotes:
        selectedPaymentMethods[0]?.observation || data.additionalNotes || '',
      items: selectedItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.totalValue,
      })),
      bonusId: selectedBonuses[0]?.id || null,
      paymentDetails: selectedPaymentMethods.map((method) => ({
        paymentType: method.paymentMethod,
        installments: method.installments || 0,
        fees: method.fees || 0,
        observation: method.observation || '',
      })),
      documents: documentsPayload,
      validity: data.validity,
      responsible: data.responsible,
      email: data.email,
      dueDate: data.dueDate,
      notes: data.notes || '',
    };

    console.log('Payload para envio:', JSON.stringify(payload, null, 2));

    try {
      await api.post('/budget', payload);

      toast.success('Orçamento salvo com sucesso!');
      reset();
    } catch (error: any) {
      console.error('Erro ao salvar o orçamento:', error);

      if (error.response) {
        console.error('Detalhes do erro da API:', error.response.data);
        toast.error(
          `Erro: ${error.response.data.message || 'Algo deu errado.'}`
        );
      } else {
        toast.error('Erro ao salvar o orçamento. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    reset();
    toast.info('Edição de orçamento cancelada.');
  };

  const totalValues = calculateFinalValues();

  const totalOriginal = parseFloat(totalValues.totalProducts);
  const totalWithBonuses = parseFloat(totalValues.totalWithBonuses);

  const bonusValue = totalOriginal - totalWithBonuses;

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
            <Button type="button">Cadastrar cliente</Button>
          </FormRowThird>
          {/* Seção Produtos e Serviços */}
          <HeaderContainer>
            <SectionTitle>Produtos e Serviços</SectionTitle>
            <IconButton
              isOpen={isProductServiceOpen}
              onClick={toggleProductServicesSection}
            >
              {isProductServiceOpen ? (
                <Minus size={20} weight="bold" color={theme['gray-100']} />
              ) : (
                <Plus size={20} weight="bold" color={theme['gray-100']} />
              )}
            </IconButton>
          </HeaderContainer>

          {isProductServiceOpen && (
            <>
              <FormRowThird>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
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
                  defaultValue={1}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Quantidade"
                      type="number"
                      min="1"
                      required
                      onChange={(e: any) => {
                        const value = Number(e.target.value);
                        field.onChange(value);
                        handleQuantityChange(value);
                      }}
                    />
                  )}
                />
              </FormRowThird>
              <SectionTitle>Detalhes do Orçamento</SectionTitle>
              <FormRow>
                <Controller
                  name="unitValue"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ? formatCurrency(field.value) : ''}
                      placeholder="Valor Unitário (R$)"
                      required
                      readOnly
                    />
                  )}
                />

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
              </FormRow>
              <FormRow>
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
              </FormRow>
              {/* Seção de Parcelamento */}

              <FormRow>
                <Button
                  type="button"
                  onClick={() => {
                    const quantity = watch('quantity');
                    if (selectedService && quantity > 0) {
                      addProductService(selectedService, quantity);
                    }
                  }}
                >
                  Adicionar Item
                </Button>
              </FormRow>
              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Valor Unit.</th>
                    <th>Valor Total</th>
                    <th>Desconto</th>
                    <th>Acréscimo</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.totalValue)}</td>
                      <td>{item.discount || '0'}%</td>
                      <td>{item.surcharge || '0'}%</td>
                      <td>
                        <Button
                          type="button"
                          backgroundColor="#ff0000"
                          onClick={() => removeProductService(item.id)}
                        >
                          <Trash color="#fff" size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {/* Seção de Bônus */}
          <HeaderContainer>
            <SectionTitle>Bônus</SectionTitle>
            <IconButton isOpen={isBonusOpen} onClick={toggleBonusSection}>
              {isBonusOpen ? (
                <Minus size={20} weight="bold" color={theme['gray-100']} />
              ) : (
                <Plus size={20} weight="bold" color={theme['gray-100']} />
              )}
            </IconButton>
          </HeaderContainer>

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
                          if (selectedBonuses.length === 0) {
                            addBonus(selected);
                          } else {
                            toast.error(
                              'Você pode adicionar somente um bônus por orçamento.'
                            );
                          }
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

              {/* Exibição do bônus selecionado */}
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
                        {bonus.type === 'percentage' ? 'Porcentagem' : 'Valor'}
                      </td>
                      <td>
                        {bonus.type === 'percentage'
                          ? `${bonus.percentage}%`
                          : ` ${bonus.value}%`}
                      </td>
                      <td>
                        <Button
                          type="button"
                          backgroundColor="#ff0000"
                          onClick={() => removeBonus(bonus.id)}
                        >
                          <Trash color="#fff" size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          <HeaderContainer>
            <SectionTitle>Método de Pagamento</SectionTitle>
            <IconButton isOpen={isPaymentOpen} onClick={togglePaymentSection}>
              {isPaymentOpen ? (
                <Minus size={20} weight="bold" color={theme['gray-100']} />
              ) : (
                <Plus size={20} weight="bold" color={theme['gray-100']} />
              )}
            </IconButton>
          </HeaderContainer>

          {isPaymentOpen && (
            <>
              <FormRow>
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
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

              {(watch('paymentMethod') === 'CREDIT_CARD' ||
                watch('paymentMethod') === 'BOLETO') && (
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

              <FormRow>
                <Controller
                  name="observation"
                  control={control}
                  render={({ field }) => (
                    <StyledTextarea
                      {...field}
                      placeholder="Adicione observações, se necessário"
                      rows={3}
                    />
                  )}
                />
              </FormRow>

              <FormRow>
                <Button type="button" onClick={addPaymentMethod}>
                  Adicionar Método de Pagamento
                </Button>
              </FormRow>

              {selectedPaymentMethods.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Método</th>
                      <th>Parcelas</th>
                      <th>Taxas (%)</th>
                      <th>Observações</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPaymentMethods.map((method) => (
                      <tr key={method.id}>
                        <td>{paymentMethodLabels[method.paymentMethod]}</td>
                        <td>{method.installments || '-'}</td>
                        <td>{method.fees || '-'}</td>
                        <td>{method.observation || '-'}</td>
                        <td>
                          <Button
                            onClick={() =>
                              setSelectedPaymentMethods((prev) =>
                                prev.filter((item) => item.id !== method.id)
                              )
                            }
                            backgroundColor="#ff0000"
                          >
                            <Trash color="#fff" size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}

          <CalculatedValuesSection>
            <SectionTitle>Resumo de Valores Calculados</SectionTitle>

            <FormRowCustom>
              <BonusSectionWrapper>
                <ValueText>
                  <strong>Valor Final:</strong>{' '}
                  {formatCurrency(Number(totalValues.finalValue))}
                </ValueText>
              </BonusSectionWrapper>
            </FormRowCustom>

            {selectedBonuses.length > 0 && totalValues.totalWithFees ? (
              <>
                <FormRowCustom>
                  <BonusSectionWrapper>
                    <ValueText>
                      Total de Bônus: {calculateTotalBonusPercentage()}%
                    </ValueText>
                    <ValueText
                      style={{
                        color: 'red',
                        fontSize: '1rem',
                        marginLeft: '10px',
                      }}
                    >
                      - {formatCurrency(bonusValue)}
                    </ValueText>
                  </BonusSectionWrapper>
                </FormRowCustom>
                <FormRowCustom>
                  <BonusSectionWrapper>
                    <ValueText>
                      Valor Final{' '}
                      <InstallmentsInfo>(com Bônus)</InstallmentsInfo>
                      {formatCurrency(
                        Number(totalValues.totalBonusesDiscountFees)
                      )}
                    </ValueText>
                  </BonusSectionWrapper>
                </FormRowCustom>
                <FormRowCustom>
                  <BonusSectionWrapper>
                    <ValueText>
                      Valor Final{' '}
                      <InstallmentsInfo>
                        (com Acréscimo de Parcelamento)
                      </InstallmentsInfo>
                      {formatCurrency(
                        Number(totalValues.finalValueWithInstallments)
                      )}
                    </ValueText>
                  </BonusSectionWrapper>
                </FormRowCustom>
              </>
            ) : null}

            {selectedPaymentMethods.length > 0 &&
              selectedPaymentMethods[0]?.installments &&
              typeof totalValues.finalValue === 'number' &&
              typeof selectedPaymentMethods[0].installments === 'number' && (
                <FormRowCustom>
                  <BonusSectionWrapper>
                    <ValueText>
                      Parcelas: {selectedPaymentMethods[0].installments}
                    </ValueText>
                    <InstallmentsInfo>
                      Valor das Parcelas:{' '}
                      {formatCurrency(
                        totalValues.finalValue /
                          selectedPaymentMethods[0].installments
                      )}
                    </InstallmentsInfo>
                  </BonusSectionWrapper>
                </FormRowCustom>
              )}

            {selectedPaymentMethods.length > 0 && (
              <FormRowCustom>
                <BonusSectionWrapper>
                  <ValueText>Formas de Pagamento:</ValueText>
                  <ul
                    style={{
                      listStyleType: 'none',
                      padding: 0,
                      marginTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                    }}
                  >
                    {selectedPaymentMethods.map((item, index) => {
                      const installmentValue = item.installments
                        ? Number(totalValues.finalValue) / item.installments
                        : 0;

                      return (
                        <PaymentMethodBox key={index}>
                          <div>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>
                              Forma de Pagamento:{' '}
                            </span>
                            <span>
                              {item.paymentMethod === 'CREDIT_CARD'
                                ? 'Cartão de Crédito'
                                : item.paymentMethod === 'BOLETO'
                                  ? 'Boleto'
                                  : 'À Vista'}
                            </span>
                          </div>

                          {item.installments ? (
                            <>
                              <span>
                                Parcelado em {item.installments}x de{' '}
                                <span style={{ color: '#007bff' }}>
                                  {formatCurrency(installmentValue)}
                                </span>
                              </span>
                              <span>
                                Valor Total:{' '}
                                <span style={{ color: '#e74c3c' }}>
                                  {formatCurrency(
                                    Number(totalValues.finalValue)
                                  )}
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                Valor Total:{' '}
                                <span style={{ color: '#007bff' }}>
                                  {formatCurrency(
                                    Number(totalValues.finalValue)
                                  )}
                                </span>
                              </span>
                            </>
                          )}
                        </PaymentMethodBox>
                      );
                    })}
                  </ul>
                </BonusSectionWrapper>
              </FormRowCustom>
            )}
          </CalculatedValuesSection>

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

          <SectionTitle>Anexos</SectionTitle>
          <FormRowCustom>
            <Button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Adicionar Anexo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </FormRowCustom>
          <AttachmentTable>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {attachments.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>
                    <Button
                      type="button"
                      backgroundColor="#ff0000"
                      onClick={() => removeAttachment(index)}
                    >
                      <Trash color="#fff" size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </AttachmentTable>

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
