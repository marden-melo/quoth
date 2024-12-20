import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme['gray-700']};
  box-sizing: border-box;
  transition: border-color 0.3s;
  resize: none;

  &:focus {
    border-color: ${({ theme }) => theme['blue-dark']};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`;
