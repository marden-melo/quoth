import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import {
  ButtonLogout,
  Container,
  Content,
  Item,
  Section,
  SettingsTitle,
  SettingsContainer,
  SelectInput,
  ButtonWrapper,
} from './styles';
import { Sidebar } from '../Sidebar';
import { useEffect } from 'react';

export function Configurations() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    logout();
    navigate('/login', { replace: true });
    window.location.reload();
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
        <SettingsContainer>
          <SettingsTitle>Configurações</SettingsTitle>

          {/* Configurações Gerais */}
          <Section>
            <h2>Configurações Gerais</h2>
            <Item>
              <label>Tema:</label>
              <SelectInput>
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </SelectInput>
            </Item>
            <Item>
              <label>Idioma:</label>
              <SelectInput>
                <option value="pt-BR">Português</option>
                <option value="en-US">Inglês</option>
              </SelectInput>
            </Item>
          </Section>

          {/* Configurações da Conta */}
          <Section>
            <h2>Conta</h2>
            <Item>
              <ButtonWrapper>
                <button>Alterar Senha</button>
              </ButtonWrapper>
            </Item>
            <Item>
              <ButtonWrapper>
                <button>Excluir Conta</button>
              </ButtonWrapper>
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
              <ButtonWrapper>
                <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>
              </ButtonWrapper>
            </Item>
          </Section>
        </SettingsContainer>
      </Content>
    </Container>
  );
}
