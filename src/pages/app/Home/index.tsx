import { Sidebar } from '../Sidebar';
import { Container, Content, Title } from './styles';

export function Home() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Home</Title>
        <p>ORÇAMENTO E GESTÃO FINANCEIRA</p>
      </Content>
    </Container>
  );
}
