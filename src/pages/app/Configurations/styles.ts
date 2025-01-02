import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  font-family: 'Roboto', sans-serif;
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme['gray-800']};
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

export const Section = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme['gray-600']};
    margin-bottom: 15px;
    font-weight: 500;
  }
`;

export const Item = styled.div`
  margin-bottom: 15px;

  label {
    font-size: 1.1rem;
    color: ${({ theme }) => theme['gray-800']};
    margin-bottom: 8px;
    display: block;
  }

  select,
  button {
    width: 100%;
    padding: 12px 18px;
    border: 1px solid ${({ theme }) => theme['gray-300']};
    border-radius: 8px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme['gray-800']};
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme['blue-500']};
    }

    &:focus {
      border-color: ${({ theme }) => theme['blue-500']};
      outline: none;
    }
  }
`;

export const ButtonLogout = styled.button`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme['red-500']};
  background-color: ${({ theme }) => theme['red-500']};
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme['red-600']};
  }

  &:focus {
    outline: none;
  }
`;
