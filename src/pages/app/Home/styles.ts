import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
  margin-top: 2rem;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-bottom: 3rem;
`;

export const AvatarWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const WelcomeMessage = styled.p`
  color: ${({ theme }) => theme['gray-600']};
  font-size: 1.3rem;
  margin-bottom: 40px;
  margin-top: 2rem;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 40px;
`;

export const Card = styled.div`
  flex: 1;
  padding: 25px;
  background-color: ${({ theme }) => theme['gray-50']};
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme['gray-800']};
    margin-bottom: 15px;
    font-weight: 500;
  }

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({ theme }) => theme['gray-600']};
  }
`;

export const ShortcutContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

export const ShortcutButton = styled.button`
  flex: 1;
  padding: 15px;
  font-weight: 500;
  background: ${({ theme }) => theme['gray-50']};
  color: ${({ theme }) => theme['gray-600']};
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition:
    color 0.3s ease,
    background 0.3s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme['gray-800']};
    background: rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme['gray-50']};
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .chart-title {
    color: ${({ theme }) => theme['gray-800']};
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 500;
  }
`;

export const UserInfoContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme['gray-50']};
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled.p`
  color: ${({ theme }) => theme['gray-800']};
  font-size: 0.8;
  font-weight: 500;
`;

export const UserEmail = styled.p`
  color: ${({ theme }) => theme['gray-600']};
  font-size: 0.7rem;
`;
