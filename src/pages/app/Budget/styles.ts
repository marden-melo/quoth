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
  }
`;

export const BonusSection = styled.div`
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
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
