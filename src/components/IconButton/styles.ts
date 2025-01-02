import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  box-sizing: border-box;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Centraliza horizontalmente o conteúdo */
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
    vertical-align: middle;
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme['gray-700']};
    vertical-align: middle;
  }
`;
