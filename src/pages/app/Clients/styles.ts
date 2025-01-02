import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 20px;
`;

export const FormRowHalf = styled(FormRow)`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowCustom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowCustomFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

export const Button = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme['gray-400']};
  background-color: ${({ active, theme }) =>
    active ? theme['primary'] : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme['gray-900'] : theme['gray-600']};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme['primary-light']};
    color: ${({ theme }) => theme['gray-900']};
  }

  &:disabled {
    background-color: ${({ theme }) => theme['gray-300']};
    color: ${({ theme }) => theme['gray-600']};
    cursor: not-allowed;
  }
`;

export const Input = styled.input<{ error?: string }>`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ theme, error }) => (error ? 'red' : theme['gray-300'])};
  border-radius: 5px;
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme['primary']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-600']};
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: red;
`;

export const FormRowTitle = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme['gray-700']};
  margin-bottom: 8px;
`;
