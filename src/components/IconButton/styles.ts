import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  box-sizing: border-box;
`;

export const Button = styled.button<{ backgroundColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  border: ${({ backgroundColor }) => (backgroundColor ? 'none' : '2px solid')};
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }

  span:first-child {
    margin-right: 10px;
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme['gray-700']};
  }
`;
