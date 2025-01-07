import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Sidebar } from '../Sidebar';
import {
  Container,
  Content,
  Title,
  Form,
  SectionTitle,
  FormRow,
  FormRowBottom,
  FormRowCustom,
  FormRowCustomFields,
  FormRowHalf,
  ArrowTitleContainer,
} from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { fetchAddressByCEP } from '@/utils/findCEP';
import { useTheme } from 'styled-components';
import { api } from '@/lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { ArrowCircleLeft } from 'phosphor-react';

interface ClientFormInputs {
  cnpj?: string;
  fullName?: string;
  cpf?: string;
  phone: string;
  email: string;
  street?: string;
  district?: string;
  city?: string;
  number?: string;
  state?: string;
  cep?: string;
  responsable?: string;
  companyName?: string;
}

export function Clients() {
  const theme = useTheme();
  const [clientType, setClientType] = useState<'COMPANY' | 'INDIVIDUAL'>(
    'COMPANY'
  );
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<ClientFormInputs>();

  const createClient = async (
    clientData: ClientFormInputs
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await api.post('/client', clientData);
      toast.success('Cliente criado com sucesso!', { position: 'top-right' });
      return true;
    } catch (error: any) {
      toast.error('Erro ao cadastrar cliente.', {
        position: 'top-right',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ClientFormInputs) => {
    const clientData = { ...data, clientType };

    if (clientData.fullName) {
      clientData.fullName = clientData.fullName.toUpperCase();
    }

    if (clientData.companyName) {
      clientData.companyName = clientData.companyName.toUpperCase();
    }

    if (clientType === 'COMPANY') {
      if (!clientData.cnpj || !clientData.fullName) {
        toast.error('CNPJ e Nome da Empresa são obrigatórios para empresas.', {
          position: 'top-right',
        });
        return;
      }
    }

    if (!data.phone || !data.email || !data.responsable) {
      toast.error('Todos os campos são obrigatórios.', {
        position: 'top-right',
      });
      return;
    }

    const creationSuccess = await createClient(clientData);

    if (creationSuccess) {
      reset({
        cnpj: '',
        companyName: '',
        cpf: '',
        fullName: '',
        phone: '',
        email: '',
        street: '',
        district: '',
        city: '',
        number: '',
        state: '',
        cep: '',
        responsable: '',
      });
    }
  };

  const handleCancel = () => {
    reset({
      cnpj: '',
      companyName: '',
      cpf: '',
      fullName: '',
      phone: '',
      email: '',
      street: '',
      district: '',
      city: '',
      number: '',
      state: '',
      cep: '',
      responsable: '',
    });
    setClientType('COMPANY');
  };

  const handleClientTypeChange = (type: 'COMPANY' | 'INDIVIDUAL') => {
    reset({
      ...getValues(),
      street: '',
      district: '',
      city: '',
      state: '',
      number: '',
      cep: '',
    });
    setClientType(type);
  };

  const handleCepChange = async (cep: string) => {
    if (cep.length === 8) {
      setValue('street', '');
      setValue('district', '');
      setValue('city', '');
      setValue('state', '');
      setIsAddressEditable(false);

      const address = await fetchAddressByCEP(cep);
      if (address) {
        setValue('street', address.street);
        setValue('district', address.district);
        setValue('city', address.city);
        setValue('state', address.state);
        setIsAddressEditable(true);
      }
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <ToastContainer />
        <ArrowTitleContainer>
          <ArrowCircleLeft
            size={32}
            color={theme['gray-500']}
            onClick={() => navigate('/see-clients')}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <Title>Cadastrar Cliente</Title>
        </ArrowTitleContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Tipo de Cliente</SectionTitle>
          <FormRow>
            <Button
              type="button"
              active={clientType === 'COMPANY'}
              backgroundColor={
                clientType === 'COMPANY' ? theme['cyan-700'] : theme['gray-400']
              }
              onClick={() => handleClientTypeChange('COMPANY')}
            >
              Empresa
            </Button>
            <Button
              type="button"
              active={clientType === 'INDIVIDUAL'}
              backgroundColor={
                clientType === 'INDIVIDUAL'
                  ? theme['cyan-700']
                  : theme['gray-400']
              }
              onClick={() => handleClientTypeChange('INDIVIDUAL')}
            >
              Pessoa Física
            </Button>
          </FormRow>

          {clientType === 'COMPANY' ? (
            <>
              <SectionTitle>Dados da Empresa</SectionTitle>
              <FormRowCustom>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="CNPJ"
                      error={errors.cnpj?.message}
                    />
                  )}
                />
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nome da Empresa"
                      error={errors.fullName?.message}
                    />
                  )}
                />
              </FormRowCustom>
              <FormRowCustomFields>
                <Controller
                  name="cep"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="CEP"
                      error={errors.cep?.message}
                      onChange={(e: any) => {
                        field.onChange(e);
                        handleCepChange(e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Rua, Avenida, etc."
                      error={errors.street?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Bairro"
                      error={errors.district?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Número"
                      error={errors.number?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Cidade"
                      error={errors.city?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Estado"
                      error={errors.state?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
              </FormRowCustomFields>
            </>
          ) : (
            <>
              <SectionTitle>Dados Pessoais</SectionTitle>
              <FormRowHalf>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="CPF"
                      error={errors.cpf?.message}
                    />
                  )}
                />
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nome Completo"
                      error={errors.fullName?.message}
                    />
                  )}
                />
              </FormRowHalf>
              <FormRowCustomFields>
                <Controller
                  name="cep"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="CEP"
                      error={errors.cep?.message}
                      onChange={(e: any) => {
                        field.onChange(e);
                        handleCepChange(e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Rua, Avenida, etc."
                      error={errors.street?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Bairro"
                      error={errors.district?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Número"
                      error={errors.number?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Cidade"
                      error={errors.city?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Estado"
                      error={errors.state?.message}
                      disabled={!isAddressEditable}
                    />
                  )}
                />
              </FormRowCustomFields>
            </>
          )}

          <SectionTitle>Contato</SectionTitle>
          <FormRowCustomFields>
            <Controller
              name="responsable"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nome do Responsável"
                  error={errors.responsable?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o Telefone"
                  error={errors.phone?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o E-mail"
                  error={errors.email?.message}
                />
              )}
            />
          </FormRowCustomFields>

          <FormRowBottom>
            <Button
              type="submit"
              backgroundColor={theme['cyan-700']}
              disabled={loading}
            >
              {loading ? 'Cadastrando' : 'Cadastrar'}
            </Button>
            <Button
              type="button"
              backgroundColor={theme.red}
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
