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

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 24px;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-left: auto;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme['gray-900']};
  }
`;

export const Status = styled.p<{ status: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ status, theme }) => {
    switch (status) {
      case 'Aprovado':
        return theme['green-500'];
      case 'Reprovado':
        return theme['red-500'];
      case 'Pendente':
        return theme['yellow-500'];
      default:
        return theme['gray-700'];
    }
  }};
`;

export const CardDetails = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme['gray-700']};

  p {
    margin: 4px 0;
  }

  strong {
    color: ${({ theme }) => theme['gray-900']};
  }
`;

export const CardFooter = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme['gray-600']};
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const IconButtonWrapper = styled.div``;
