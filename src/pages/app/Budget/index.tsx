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
  FormRowHalf,
  FormRowCustom,
} from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { TextArea } from '@/components/TextArea';
import { useTheme } from 'styled-components';

interface BudgetFormData {
  cliente: string;
  servico: string;
  quantidade: number;
  valor: number;
  data: string;
  descricao: string;
  status: string;
  formaPagamento: string;
  desconto: number;
  acrescimo: number;
  validade: string;
  responsavel: string;
  vencimento: string;
  endereco: string;
  observacoes: string;
  anexos: FileList;
}

export function Budget() {
  const { handleSubmit, control, reset } = useForm<BudgetFormData>();

  const theme = useTheme();

  const onSubmit = (data: BudgetFormData) => {
    console.log('Form Submitted:', data);
    // Lógica para salvar o orçamento
    reset(); // Resetar campos após envio
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Criar Orçamento</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Dados do Cliente</SectionTitle>
          <FormRow>
            <Controller
              name="cliente"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Nome do Cliente" />
              )}
            />
            <Button type="button">Cadastrar Cliente</Button>
          </FormRow>

          {/* Serviços */}
          <SectionTitle>Serviços</SectionTitle>
          <FormRow>
            <Controller
              name="servico"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Selecione um Serviço</option>
                  <option value="servico1">Serviço 1</option>
                  <option value="servico2">Serviço 2</option>
                  <option value="servico3">Serviço 3</option>
                </Select>
              )}
            />
            <Controller
              name="quantidade"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Quantidade" type="number" />
              )}
            />
          </FormRow>

          <SectionTitle>Detalhes do Orçamento</SectionTitle>
          <FormRowHalf>
            <Controller
              name="valor"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Valor (R$)" type="number" />
              )}
            />
            <Controller
              name="data"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Data do Orçamento" type="date" />
              )}
            />
          </FormRowHalf>

          <FormRowHalf>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Selecione o Status</option>
                  <option value="pendente">Pendente</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="rejeitado">Rejeitado</option>
                  <option value="em_progresso">Em Progresso</option>
                </Select>
              )}
            />
            <Controller
              name="formaPagamento"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Selecione a Forma de Pagamento</option>
                  <option value="pix">PIX</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="boleto">Boleto</option>
                  <option value="transferencia">Transferência Bancária</option>
                  <option value="cartao">Cartão de Crédito</option>
                  <option value="cartaoDebito">Cartão de Débito</option>
                </Select>
              )}
            />
          </FormRowHalf>

          <FormRowHalf>
            <Controller
              name="desconto"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Desconto (%)" type="number" />
              )}
            />
            <Controller
              name="acrescimo"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Acréscimo (%)" type="number" />
              )}
            />
          </FormRowHalf>

          <FormRowHalf>
            <Controller
              name="validade"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Validade do Orçamento"
                  type="date"
                />
              )}
            />
            <Controller
              name="responsavel"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Responsável pelo Orçamento" />
              )}
            />
          </FormRowHalf>

          <SectionTitle>Outros Detalhes</SectionTitle>
          <FormRowCustom>
            <Controller
              name="vencimento"
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
              name="endereco"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Endereço" />
              )}
            />
          </FormRowCustom>

          <Controller
            name="observacoes"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Observações Adicionais"
                rows={4}
              />
            )}
          />

          <Controller
            name="anexos"
            control={control}
            render={({ field }) => <Input {...field} type="file" multiple />}
          />

          <FormRowBottom>
            <Button type="submit" backgroundColor={theme['green-300']}>
              Salvar Orçamento
            </Button>
            <Button type="button" onClick={handleCancel} cancel>
              Cancelar
            </Button>
          </FormRowBottom>
        </Form>
      </Content>
    </Container>
  );
}
