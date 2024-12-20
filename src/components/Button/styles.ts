import styled from 'styled-components';

export const StyledButton = styled.button<{
  cancel?: boolean;
  backgroundColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, cancel, backgroundColor }) =>
    backgroundColor || (cancel ? theme['red-300'] : theme['blue-300'])};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: ${({ theme, cancel, backgroundColor }) =>
      backgroundColor
        ? backgroundColor
        : cancel
          ? theme['red-300']
          : theme['blue-light']};
    transform: scale(1.01);
  }

  &:disabled {
    background-color: ${({ theme }) => theme['gray-300']};
    color: ${({ theme }) => theme['gray-500']};
    cursor: not-allowed;
    transform: none;
  }
`;
