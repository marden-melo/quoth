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
  color: ${({ theme }) => theme['gray-800']};
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-600']};
    margin-bottom: 10px;
  }
`;

export const Item = styled.div`
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: ${({ theme }) => theme['gray-800']};
  }

  select,
  button {
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme['gray-300']};
    border-radius: 4px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme['gray-800']};
  }
`;
