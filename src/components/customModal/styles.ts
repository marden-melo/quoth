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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CategoryList = styled.ul`
  margin-top: 16px;
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  max-height: 20rem;
`;

export const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme['gray-200']};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  span {
    flex: 1;
    font-size: 16px;
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 4px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme['gray-400']};
  border-radius: 4px;
`;
