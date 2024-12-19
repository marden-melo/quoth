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
