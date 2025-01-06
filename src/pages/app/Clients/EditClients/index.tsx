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
import { Loading } from '@/components/Loading';
import { maskCnpj } from '@/utils/masks/maskCNPJ';
import { maskCpf } from '@/utils/masks/maskCPF';

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
  const [initialData, setInitialData] = useState<ClientFormInputs | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormInputs>();

  useEffect(() => {
    const fetchClientData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data } = await api.get(`/client/${id}`);
        const clientData = data.data as ClientFormInputs;

        setInitialData(clientData);

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

  useEffect(() => {
    if (!initialData) return;

    const subscription = watch((value) => {
      const isChanged = Object.keys(value).some(
        (key) =>
          value[key as keyof ClientFormInputs] !==
          initialData[key as keyof ClientFormInputs]
      );
      setIsFormChanged(isChanged);
    });

    return () => subscription.unsubscribe();
  }, [watch, initialData]);

  const onSubmit = async (data: ClientFormInputs) => {
    if (!initialData) return;

    const changedData: ClientFormInputs = Object.keys(data).reduce(
      (acc, key) => {
        const currentValue = data[key as keyof ClientFormInputs];
        const initialValue = initialData[key as keyof ClientFormInputs];

        if (currentValue !== initialValue) {
          if (
            data.clientType === 'INDIVIDUAL' &&
            key !== 'cpf' &&
            key !== 'fullName' &&
            key !== 'phone' &&
            key !== 'email' &&
            key !== 'cep' &&
            key !== 'street' &&
            key !== 'district' &&
            key !== 'number' &&
            key !== 'city' &&
            key !== 'state'
          ) {
            return acc;
          }
          if (
            data.clientType === 'COMPANY' &&
            key !== 'cnpj' &&
            key !== 'companyName' &&
            key !== 'responsable' &&
            key !== 'phone' &&
            key !== 'email' &&
            key !== 'cep' &&
            key !== 'street' &&
            key !== 'district' &&
            key !== 'number' &&
            key !== 'city' &&
            key !== 'state'
          ) {
            return acc;
          }

          acc[key as keyof ClientFormInputs] = currentValue;
        }

        return acc;
      },
      {} as ClientFormInputs
    );

    setLoading(true);
    try {
      const response = await api.put(`/client/${id}`, changedData);
      if (response.status === 200) {
        toast.success('Cliente atualizado com sucesso!', {
          position: 'top-right',
        });

        setTimeout(() => {
          navigate('/see-clients');
        }, 1500);
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
    navigate('/see-clients');
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
        {loading ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle>Tipo de Cliente</SectionTitle>
            <FormRow>
              {clientType === 'COMPANY' ? (
                <Button
                  type="button"
                  active
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
                        value={maskCnpj(field.value || '')}
                        onChange={(e: any) =>
                          field.onChange(maskCnpj(e.target.value))
                        }
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
                        value={maskCpf(field.value || '')}
                        onChange={(e: any) =>
                          field.onChange(maskCpf(e.target.value))
                        }
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

            <FormRowBottom>
              <Button
                type="submit"
                backgroundColor={theme['cyen-700']}
                disabled={!isFormChanged || loading}
              >
                Salvar
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
        )}
      </Content>
    </Container>
  );
}
