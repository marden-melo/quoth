import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme['gray-900']};
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
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

export const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme['gray-800']};

  font-weight: 600;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

export const FormRowCustom = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-radius: 8px;
  background-color: ${({ theme }) => theme['gray-100']};
  color: ${({ theme }) => theme['gray-900']};
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme['blue-500']};
    background-color: ${({ theme }) => theme['blue-100']};
  }
`;

export const StyledSelect = styled.select`
  ${StyledInput};
`;

export const StyledTextArea = styled.textarea`
  ${StyledInput};
  resize: none;
`;

export const StyledButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme['blue-500']};
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme['blue-600']};
  }
`;

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme['gray-900']};
  color: ${({ theme }) => theme.white};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
