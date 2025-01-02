import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme['gray-800']};
  margin-bottom: 20px;
`;

export const ClientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  max-height: 80vh;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ClientCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

export const ClientInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ClientText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme['gray-600']};
`;

export const ClientTitleText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme['gray-600']};
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme['red-500']};
  font-size: 1rem;
  margin-bottom: 20px;
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

export const TitleItems = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme['gray-900']};
`;

export const EmptyMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme['gray-500']};
  margin-top: 50px;
`;

export const ArrowWrapper = styled.div`
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
