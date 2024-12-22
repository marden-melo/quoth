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

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 24px;
`;

export const SearchWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  max-width: 250px;
  margin-left: 16px;
`;

export const ProductList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme['gray-50']};
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 120px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme['gray-200']};
  }

  div {
    flex: 1;
    margin-right: 16px;
  }

  h3 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme['gray-800']};
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme['gray-600']};
    margin: 4px 0;
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;

  button {
    background: ${({ theme }) => theme['gray-200']};
    border: 2px solid transparent;
    padding: 8px;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme['blue-200']};
    }

    &:active {
      transform: scale(0.9);
    }

    svg {
      color: ${({ theme }) => theme['gray-600']};
    }

    &.delete:hover {
      background-color: ${({ theme }) => theme['red-300']};
    }

    &.edit:hover,
    &.view:hover {
      transform: scale(1.1);
    }
  }
`;
