import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';
import logo from '@/assets/logo_quoth300.png';
import backgroundImage from '@/assets/dashboard.png';
import {
  Button,
  Container,
  Content,
  Description,
  Footer,
  Header,
  WhatsAppButton,
  ButtonGroup,
  IconContainer,
} from './styles';
import { IconButton } from '@/components/IconButton';
import { User, Lock, List, WhatsappLogo } from 'phosphor-react';

export function Apresentation() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handlePlans = () => {
    navigate('/plans');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5535999039120', '_blank');
  };

  return (
    <Container>
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image"
      />
      <Header>
        <img src={logo} alt="Logo da Aplicação" />
        <ButtonGroup>
          <IconButton
            icon={<List size={20} />}
            text="Planos"
            onClick={handlePlans}
            style={{
              backgroundColor: theme['gray-200'],
              color: theme.white,
            }}
          />
          <IconButton
            icon={<Lock size={20} />}
            text="Entrar no Quoth"
            onClick={handleLogin}
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${theme['gray-500']}`,
              color: theme['gray-500'],
            }}
          />
          <IconButton
            icon={<User size={20} />}
            text="Criar Conta"
            onClick={handleCreateAccount}
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${theme['gray-300']}`,
              color: theme['gray-300'],
            }}
          />
        </ButtonGroup>
      </Header>
      <Content>
        <Description>
          <h2>
            Transforme a gestão de seus orçamentos com nosso software completo e
            intuitivo!
          </h2>
          <p>
            Nosso software foi desenvolvido para facilitar a criação, edição e
            acompanhamento de orçamentos, tornando o processo mais ágil e
            eficiente. Com funcionalidades avançadas e um design simples, ele é
            a solução perfeita para quem busca praticidade e controle total.
          </p>

          <p>
            Acelere sua rotina de trabalho e otimize seus processos com nosso
            software! Ele não só facilita a criação de orçamentos, mas também
            permite que você acompanhe e compartilhe suas propostas de forma
            simples e rápida.
          </p>
        </Description>
        <Footer>
          <Button backgroundColor={theme['gray-500']}>
            Conheça nossos planos
          </Button>
        </Footer>
      </Content>
      <WhatsAppButton onClick={handleWhatsAppClick}>
        <WhatsappLogo size={30} color={theme.white} />
      </WhatsAppButton>
    </Container>
  );
}
