import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${scaleUp} 0.3s ease-out;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
`;
