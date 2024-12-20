import { NavLink } from 'react-router'; // Corrigido para NavLink
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme['gray-300']};
  padding-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.text};

  &.active {
    color: ${({ theme }) => theme['blue-500']}; /* Cor azul quando ativo */
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ButtonContainerExit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: auto;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.white};
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme['gray-200']};
    transform: scale(1.05);
  }

  span:first-child {
    margin-right: 10px;
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme['gray-700']};
  }
`;
