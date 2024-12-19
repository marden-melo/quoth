import { IconButton } from '@/components/IconButton';
import {
  Container,
  LogoContainer,
  ButtonContainer,
  ButtonContainerExit,
  StyledLink,
} from './styles';
import Logo from '@/assets/logo_quoth300.png';
import {
  FileText,
  Gear,
  Plus,
  ChartLineUp,
  CirclesFour,
  House,
  SignOut,
} from 'phosphor-react';

export function Sidebar() {
  return (
    <Container>
      <LogoContainer>
        <img src={Logo} alt="Logo" width={100} height={50} />
      </LogoContainer>
      <ButtonContainer>
        <StyledLink to="/">
          <IconButton
            text="Página inicial"
            icon={<House size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
        <StyledLink to="/newbudget">
          <IconButton
            text="Novo orçamento"
            icon={<Plus size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
        <StyledLink to="/listbudget">
          {' '}
          <IconButton
            text="Lista de orçamentos"
            icon={<FileText size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
        <StyledLink to="/productsservices">
          {' '}
          <IconButton
            text="Produtos e Serviços"
            icon={<CirclesFour size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
        <StyledLink to="/dashboard">
          {' '}
          <IconButton
            text="Dashboard"
            icon={<ChartLineUp size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
        <StyledLink to="/configurations">
          {' '}
          <IconButton
            text="Configurações"
            icon={<Gear size={24} />}
            onClick={() => {}}
          />
        </StyledLink>
      </ButtonContainer>
      {/* Colocando o botão de "Sair" no final */}
      <ButtonContainerExit>
        <IconButton
          text="Sair"
          icon={<SignOut size={24} />}
          onClick={() => {
            // Aqui você pode adicionar a lógica para logout
            console.log('Saindo...');
          }}
        />
      </ButtonContainerExit>
    </Container>
  );
}
