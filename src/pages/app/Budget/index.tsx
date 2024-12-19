import { Sidebar } from '../Sidebar';
import { Container, Content, Title } from './styles';

export function Budget() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Budget</Title>
        <p>Budget</p>
      </Content>
    </Container>
  );
}
