import { ReactNode } from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  isOpen: boolean;
  children: ReactNode;
}

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

export const TitleValidit = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.red};
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
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowHalf = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowThird = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
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
  gap: 6px;
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  padding: 10px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-size: 0.9rem;
  }
`;

export const BonusDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

export const ValueText = styled.strong`
  color: #333;
  font-size: 1.2rem;
`;

export const InstallmentsInfo = styled.p`
  color: #888;
  font-size: 1rem;
  margin-top: 5px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.red : theme['cyan-700']};
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const CalculatedValuesSection = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BonusSectionWrapper = styled.div`
  background-color: #f9fafc;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #dfe3e8;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PaymentMethodBox = styled.li`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & div {
    display: flex;
    gap: 0.5rem;
    font-size: 1rem;
  }

  & span:first-child {
    font-weight: bold;
    color: #333;
  }

  & span:last-child {
    color: #555;
    font-size: 0.9rem;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  background-color: ${({ theme }) => theme['gray-50']};
  color: ${({ theme }) => theme['gray-700']};
  resize: none;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme['blue-dark']};
    box-shadow: 0 0 4px ${({ theme }) => theme['blue-light']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`;

// Estilo para tabela de anexos
export const AttachmentTable = styled(Table)`
  margin-top: 20px;
  th,
  td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
`;

// Estilo para campos personalizados
export const CustomFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  input {
    flex: 1;
  }
`;
