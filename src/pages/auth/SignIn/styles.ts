import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

export const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
  z-index: 1;
`;

export const Logo = styled.img`
  max-width: 150px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  color: ${({ theme }) => theme['gray-800']};
  margin-bottom: 20px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme['gray-800']};
  background-color: ${({ theme }) => theme.white};

  &:focus {
    border-color: ${({ theme }) => theme['blue-500']};
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 15px;
  margin: 20px 0;
  background-color: ${({ theme }) => theme['blue-500']};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme['blue-600']};
  }
`;

export const LinkText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme['blue-700']};
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: ${({ theme }) => theme['gray-500']};
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  color: #fff;
`;
