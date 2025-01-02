import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import {
  ButtonLogout,
  Container,
  Content,
  Item,
  Section,
  Title,
} from './styles';
import { Sidebar } from '../Sidebar';
import { useEffect } from 'react';

export function Configurations() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    logout();

    window.location.reload();

    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Configurações</Title>

        {/* Configurações Gerais */}
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

        {/* Configurações da Conta */}
        <Section>
          <h2>Conta</h2>
          <Item>
            <button>Alterar Senha</button>
          </Item>
          <Item>
            <button>Excluir Conta</button>
          </Item>
        </Section>

        {/* Notificações */}
        <Section>
          <h2>Notificações</h2>
          <Item>
            <label>
              <input type="checkbox" />
              Receber notificações por e-mail
            </label>
          </Item>
        </Section>

        {/* Botão para sair */}
        <Section>
          <Item>
            <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>
          </Item>
        </Section>
      </Content>
    </Container>
  );
}
