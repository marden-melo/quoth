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
            clients.map((client) => (
              <ClientCard key={client.id}>
                <ClientInfoContainer>
                  <ClientTitleText>
                    {client.companyName || client.fullName}
                  </ClientTitleText>

                  <ClientText>
                    {client.cpf ? (
                      <>
                        <TitleItems>CPF:</TitleItems> {client.cpf}
                      </>
                    ) : (
                      <>
                        <TitleItems>CNPJ:</TitleItems> {client.cnpj}
                      </>
                    )}
                  </ClientText>
                  <ClientText>
                    <TitleItems>Contato:</TitleItems> {client.phone}
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
                        {client.state}, {client.cep}
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
                    icon={<Pencil size={24} color={theme['blue-500']} />}
                    text="Editar"
                  />
                  <IconButton
                    onClick={() => openDeleteModal(client.id)}
                    icon={<Trash size={24} color={theme['red-500']} />}
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
