import styled from 'styled-components';

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  font-size: 16px;
  color: ${({ theme }) => theme['gray-900']};
  background-color: ${({ theme }) => theme.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme['blue-500']};
  }
`;
