import { useTheme } from 'styled-components';
import { Sidebar } from '../Sidebar';
import Avatar from 'react-avatar';
import {
  Container,
  Content,
  WelcomeMessage,
  CardContainer,
  Card,
  ShortcutContainer,
  ShortcutButton,
  ChartContainer,
  UserInfoContainer,
  UserName,
  UserEmail,
  AvatarWrapper,
  Title,
} from './styles';
import { useNavigate } from 'react-router';
import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
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

const mockData = [
  ['Status', 'Quantidade'],
  ['Aprovados', 20],
  ['Pendentes', 10],
  ['Rejeitados', 5],
];

export function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/me');
        const data: UserData = response.data;
        console.log('Usuário:', data);
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        {userData && (
          <UserInfoContainer>
            <AvatarWrapper>
              <Avatar
                name={userData.user.name}
                size="40"
                round={true}
                src={userData.user.avatar || undefined}
              />
            </AvatarWrapper>
            <div>
              <UserName>{userData.user.name}</UserName>
              <UserEmail>{userData.user.email}</UserEmail>
            </div>
          </UserInfoContainer>
        )}

        <WelcomeMessage>
          Gerencie seus orçamentos, clientes, produtos e serviços de forma
          simples e eficiente.
        </WelcomeMessage>

        <CardContainer>
          <Card>
            <h2>Orçamentos Criados</h2>
            <p>150</p>
          </Card>
          <Card>
            <h2>Clientes Ativos</h2>
            <p>45</p>
          </Card>
          <Card>
            <h2>Produtos/Serviços</h2>
            <p>120</p>
          </Card>
        </CardContainer>

        <ShortcutContainer>
          <ShortcutButton onClick={() => navigate('/newbudget')}>
            Criar Orçamento
          </ShortcutButton>
          <ShortcutButton onClick={() => navigate('/clients')}>
            Cadastrar Cliente
          </ShortcutButton>
          <ShortcutButton onClick={() => navigate('/add-product-service')}>
            Cadastrar Novo Produto/Serviço
          </ShortcutButton>
        </ShortcutContainer>

        <ChartContainer>
          <Chart
            chartType="PieChart"
            data={mockData}
            width="100%"
            height="300px"
            options={{
              title: 'Status dos Orçamentos',
              pieHole: 0.4,
              colors: [
                theme['green-300'],
                theme['yellow-300'],
                theme['red-300'],
              ],
            }}
          />
        </ChartContainer>
      </Content>
    </Container>
  );
}
