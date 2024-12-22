import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.white};
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 6px ${({ theme }) => theme['gray-300']};
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    color: ${({ theme }) => theme['gray-800']};
    margin-bottom: 8px;
  }

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme['red-500']};
    margin-top: 4px;
  }

  input,
  select,
  textarea {
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme['gray-300']};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme['blue-300']};
    }
  }

  textarea {
    resize: none;
  }
`;

export const FormRowHalf = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 2rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme['blue-500']};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: ${({ theme }) => theme['gray-400']};
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({ theme }) => theme['blue-600']};
  }

  &:active {
    background-color: ${({ theme }) => theme['blue-700']};
  }
`;
