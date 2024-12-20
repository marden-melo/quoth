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
} from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { fetchAddressByCEP } from '@/utils/findCEP';
import { useTheme } from 'styled-components';

interface ClientFormInputs {
  cnpj?: string;
  companyName?: string;
  cpf?: string;
  fullName?: string;
  phone: string;
  email: string;
  street?: string;
  district?: string;
  city?: string;
  number?: string;
  state?: string;
  cep?: string;
  responsable?: string;
}

export function Clients() {
  const theme = useTheme();
  const [clientType, setClientType] = useState<'company' | 'individual'>(
    'company'
  );
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ClientFormInputs>();

  const onSubmit = (data: ClientFormInputs) => {
    console.log(data);
    reset();
  };

  const handleCancel = () => {
    reset();
  };

  const handleClientTypeChange = (type: 'company' | 'individual') => {
    setClientType(type);
  };

  const handleCepChange = async (cep: string) => {
    if (cep.length === 8) {
      // Reseta os campos para evitar bloqueios ao buscar novo CEP
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
        <Title>Cadastrar Cliente</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Tipo de Cliente</SectionTitle>
          <FormRow>
            <Button
              type="button"
              active={clientType === 'company'}
              onClick={() => handleClientTypeChange('company')}
            >
              Empresa
            </Button>
            <Button
              type="button"
              active={clientType === 'individual'}
              onClick={() => handleClientTypeChange('individual')}
            >
              Pessoa Física
            </Button>
          </FormRow>

          {clientType === 'company' ? (
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
            </>
          )}

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

          <SectionTitle>Contato</SectionTitle>
          <FormRowCustomFields>
            <Controller
              name="responsable"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nome do Responsável"
                  error={errors.phone?.message}
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
                  placeholder="Digite o Email"
                  error={errors.email?.message}
                />
              )}
            />
          </FormRowCustomFields>

          <FormRowBottom>
            <Button type="submit" backgroundColor={theme['green-500']}>
              Salvar cliente
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
