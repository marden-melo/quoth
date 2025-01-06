import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
`;

export const ModalContent = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.white};
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.9)')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Título do Modal
export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme['gray-800']};
  margin-bottom: 16px;
`;

// Botão de fechar do Modal
export const ModalCloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme['gray-800']};
  }
`;

export const ModalButton = styled.button`
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
