import { Sidebar } from '../Sidebar';
import { Container, Content, Title, Section, Item } from './styles';

export function Configurations() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Configurações</Title>
        <Section>
          <h2>Configurações Gerais</h2>
          <Item>
            <label>Tema:</label>
            <select>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </Item>
          <Item>
            <label>Idioma:</label>
            <select>
              <option value="pt-BR">Português</option>
              <option value="en-US">Inglês</option>
            </select>
          </Item>
        </Section>
        <Section>
          <h2>Conta</h2>
          <Item>
            <button>Alterar Senha</button>
          </Item>
          <Item>
            <button>Excluir Conta</button>
          </Item>
        </Section>
        <Section>
          <h2>Notificações</h2>
          <Item>
            <label>
              <input type="checkbox" />
              Receber notificações por e-mail
            </label>
          </Item>
        </Section>
      </Content>
    </Container>
  );
}
