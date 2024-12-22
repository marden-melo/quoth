import { useTheme } from 'styled-components';
import { Sidebar } from '../Sidebar';
import {
  Container,
  Content,
  WelcomeMessage,
  CardContainer,
  Card,
  ShortcutContainer,
  ShortcutButton,
  ChartContainer,
} from './styles';
import { useNavigate } from 'react-router';
import { Chart } from 'react-google-charts';

const mockData = [
  ['Status', 'Quantidade'],
  ['Aprovados', 20],
  ['Pendentes', 10],
  ['Rejeitados', 5],
];

export function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar />
      <Content>
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
