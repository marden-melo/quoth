import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
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
import { Sidebar } from '../../Sidebar';
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
  clientType: 'COMPANY' | 'INDIVIDUAL';
}

export function EditClients() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [clientType, setClientType] = useState<'COMPANY' | 'INDIVIDUAL'>(
    'COMPANY'
  );
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ClientFormInputs>();

  useEffect(() => {
    const fetchClientData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data } = await api.get(`/client/${id}`);

        const clientData = data.data as ClientFormInputs;

        setValue('cnpj', clientData.cnpj || '');
        setValue('companyName', clientData.companyName || '');
        setValue('cpf', clientData.cpf || '');
        setValue('fullName', clientData.fullName || '');
        setValue('phone', clientData.phone || '');
        setValue('email', clientData.email || '');
        setValue('street', clientData.street || '');
        setValue('district', clientData.district || '');
        setValue('city', clientData.city || '');
        setValue('state', clientData.state || '');
        setValue('number', clientData.number || '');
        setValue('cep', clientData.cep || '');
        setValue('responsable', clientData.responsable || '');
        setValue('clientType', clientData.clientType || 'COMPANY');

        setClientType(clientData.clientType);
      } catch (error) {
        toast.error('Erro ao carregar os dados do cliente.', {
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id, setValue]);

  const onSubmit = async (data: ClientFormInputs) => {
    setLoading(true);
    try {
      const response = await api.put(`/client/${id}`, data);
      if (response.status === 200) {
        toast.success('Cliente atualizado com sucesso!', {
          position: 'top-right',
        });
        navigate('/see-clients');
      }
    } catch (error) {
      toast.error('Erro ao atualizar os dados do cliente.', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
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
      clientType: 'COMPANY',
    });
    setClientType('COMPANY');
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
          <Title>Editar Cliente</Title>
        </ArrowTitleContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Tipo de Cliente</SectionTitle>
          <FormRow>
            {clientType === 'COMPANY' ? (
              <Button
                type="button"
                active={true}
                backgroundColor={theme['gray-500']}
                disabled
              >
                Empresa
              </Button>
            ) : (
              <Button
                type="button"
                active={false}
                backgroundColor={theme['gray-500']}
                disabled
              >
                Pessoa Física
              </Button>
            )}
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
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nome da Empresa"
                      error={errors.companyName?.message}
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
                  defaultValue=""
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
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="E-mail"
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Telefone"
                  error={errors.phone?.message}
                />
              )}
            />
          </FormRowCustomFields>

          <FormRowBottom>
            <Button
              type="submit"
              backgroundColor={theme['green-300']}
              disabled={loading}
            >
              {loading ? 'Editando' : 'Editar'}
            </Button>
            <Button
              type="button"
              backgroundColor={theme['red-300']}
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
