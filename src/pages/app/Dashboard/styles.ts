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

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterSelect = styled.select`
  padding: 12px;
  margin-right: 20px;
  border: 1px solid ${({ theme }) => theme['gray-100']};
  border-radius: 8px;
  font-size: 1.2rem;
  width: 200px;
  background-color: ${({ theme }) => theme['gray-50']};
  color: ${({ theme }) => theme['gray-600']};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme['blue-500']};
    outline: none;
  }

  option {
    padding: 10px;
  }
`;

export const FilterOption = styled.option`
  padding: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme['gray-600']};
  background-color: ${({ theme }) => theme['gray-100']};

  &:hover {
    background-color: ${({ theme }) => theme['blue-100']};
  }
`;
