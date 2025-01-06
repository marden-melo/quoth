import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import { Pencil, PlusCircle, Trash, ArrowUp, ArrowDown } from 'phosphor-react';
import { useTheme } from 'styled-components';
import { IconButton } from '@/components/IconButton';
import {
  Actions,
  ClientCard,
  ClientList,
  Container,
  Content,
  Title,
  ClientInfoContainer,
  ClientText,
  SearchWrapper,
  IconButtonWrapper,
  TitleItems,
  ClientTitleText,
  EmptyMessage,
} from './styles';
import { useNavigate } from 'react-router';
import { Sidebar } from '../../Sidebar';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { ModalConfirm } from '@/components/modalConfirm';
import { maskCnpj } from '@/utils/masks/maskCNPJ';
import { maskPhone } from '@/utils/masks/maskPhone';
import { maskCpf } from '@/utils/masks/maskCPF';
import { maskCep } from '@/utils/masks/maskCep';

interface Client {
  id: string;
  fullName: string;
  companyName: string | null;
  phone: string;
  email: string;
  clientType: 'INDIVIDUAL' | 'COMPANY';
  cpf: string;
  cnpj: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  responsable: string;
}

export function SeeAllClients() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/clients');
      setClients(response.data.data);
    } catch (error) {
      toast.error('Erro ao buscar clientes.', { position: 'top-right' });
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEditClient = (id: string) => {
    navigate(`/edit-client/${id}`);
  };

  const handleDeleteClient = async () => {
    if (clientToDelete) {
      try {
        await api.delete(`/client/${clientToDelete}`);
        toast.success('Cliente deletado com sucesso!', {
          position: 'top-right',
        });
        fetchClients();
      } catch (error) {
        toast.error('Erro ao deletar cliente.', { position: 'top-right' });
      } finally {
        closeDeleteModal();
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setClientToDelete(id);
    setModalVisible(true);
  };

  const closeDeleteModal = () => {
    setModalVisible(false);
    setClientToDelete(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedClient((prev) => (prev === id ? null : id));
  };

  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();

    const isFullNameMatch =
      client.fullName && client.fullName.toLowerCase().includes(searchLower);
    const isCompanyNameMatch =
      client.companyName &&
      client.companyName.toLowerCase().includes(searchLower);
    const isCpfMatch = client.cpf && client.cpf.includes(searchLower);
    const isCnpjMatch = client.cnpj && client.cnpj.includes(searchLower);
    const isPhoneMatch = client.phone && client.phone.includes(searchLower);
    const isCityMatch =
      client.city && client.city.toLowerCase().includes(searchLower);
    const isResponsableMatch =
      client.responsable &&
      client.responsable.toLowerCase().includes(searchLower);
    const isStateMatch =
      client.state && client.state.toLowerCase().includes(searchLower);

    return (
      isFullNameMatch ||
      isCompanyNameMatch ||
      isCpfMatch ||
      isCnpjMatch ||
      isPhoneMatch ||
      isCityMatch ||
      isResponsableMatch ||
      isStateMatch
    );
  });

  return (
    <Container>
      <Sidebar />
      <ToastContainer />
      <Content>
        <Title>Clientes Cadastrados</Title>

        <SearchWrapper>
          <Input
            type="text"
            placeholder="Pesquisar cliente"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
          <IconButtonWrapper>
            <IconButton
              icon={<PlusCircle size={26} />}
              onClick={() => navigate('/clients')}
              text="Cadastrar Cliente"
              style={{ backgroundColor: theme['green-200'] }}
            />
          </IconButtonWrapper>
        </SearchWrapper>

        <ClientList>
          {loading ? (
            <Loading />
          ) : clients.length === 0 ? (
            <EmptyMessage>Não há clientes cadastrados</EmptyMessage>
          ) : (
            filteredClients.map((client) => (
              <ClientCard key={client.id}>
                <ClientInfoContainer>
                  <ClientTitleText>
                    {client.companyName || client.fullName}
                  </ClientTitleText>

                  <ClientText>
                    {client.cpf ? (
                      <>
                        <TitleItems>CPF:</TitleItems> {maskCpf(client.cpf)}
                      </>
                    ) : (
                      <>
                        <TitleItems>CNPJ:</TitleItems> {maskCnpj(client.cnpj)}
                      </>
                    )}
                  </ClientText>
                  <ClientText>
                    <TitleItems>Contato:</TitleItems> {maskPhone(client.phone)}
                  </ClientText>

                  {expandedClient === client.id && (
                    <>
                      <ClientText>
                        <TitleItems>E-mail:</TitleItems> {client.email}
                      </ClientText>
                      <ClientText>
                        {client.clientType === 'INDIVIDUAL' ? (
                          <>
                            <TitleItems>Tipo:</TitleItems> Pessoa Física
                          </>
                        ) : (
                          <>
                            <TitleItems>Tipo:</TitleItems> Empresa
                          </>
                        )}
                      </ClientText>
                      <ClientText>
                        <TitleItems>Endereço: </TitleItems> {client.street},{' '}
                        {client.number}, {client.district}, {client.city} -{' '}
                        {client.state}, {maskCep(client.cep)}
                      </ClientText>
                      <ClientText>
                        <TitleItems>Responsável: </TitleItems>{' '}
                        {client.responsable}
                      </ClientText>
                    </>
                  )}
                </ClientInfoContainer>
                <Actions>
                  <IconButton
                    onClick={() => handleEditClient(client.id)}
                    icon={<Pencil size={24} color={theme['cyan-700']} />}
                    text="Editar"
                  />
                  <IconButton
                    onClick={() => openDeleteModal(client.id)}
                    icon={<Trash size={24} color={theme.red} />}
                    text="Excluir"
                  />
                  <IconButton
                    onClick={() => toggleExpand(client.id)}
                    icon={
                      expandedClient === client.id ? (
                        <ArrowUp size={24} color={theme['gray-500']} />
                      ) : (
                        <ArrowDown size={24} color={theme['gray-500']} />
                      )
                    }
                    text={expandedClient === client.id ? 'Fechar' : 'Ver mais'}
                  />
                </Actions>
              </ClientCard>
            ))
          )}
        </ClientList>
      </Content>

      {modalVisible && (
        <ModalConfirm
          message="Tem certeza que deseja excluir?"
          onConfirm={handleDeleteClient}
          onCancel={closeDeleteModal}
        />
      )}
    </Container>
  );
}
