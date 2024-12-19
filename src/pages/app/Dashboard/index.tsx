import { Sidebar } from '../Sidebar';
import { Container, Content, Title } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Dashboard</Title>
        <p>Dashboard</p>
      </Content>
    </Container>
  );
}
