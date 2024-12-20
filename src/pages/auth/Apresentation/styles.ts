import styled from 'styled-components';

export const WhatsAppButton = styled.button`
  position: fixed;
  bottom: 20px; /* Ajuste a distância da parte inferior */
  right: 20px; /* Ajuste a distância da parte direita */
  background-color: #25d366; /* Cor do botão do WhatsApp */
  border: none;
  border-radius: 50%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* Efeito de hover */
  }

  svg {
    color: ${({ theme }) => theme.white}; /* Cor do ícone */
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  color: ${({ theme }) => theme.white};

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    z-index: -1;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px; /* Ajustado para espaçamento confortável */
  background-color: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme['gray-800']};
  border-bottom: 1px solid ${({ theme }) => theme['gray-300']};

  > div {
    display: flex;
    gap: 25px; /* Aumentado para melhorar o espaçamento entre os botões */
  }

  img {
    max-height: 80px; /* Ajustado para uma dimensão mais equilibrada */
    width: auto;
    object-fit: contain;
  }
`;

export const Button = styled.button<{ backgroundColor: string }>`
  padding: 12px 30px; /* Ajustado para proporcionar um clique mais confortável */
  font-size: 1.1rem; /* Aumentado para melhorar a legibilidade */
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 30px; /* Ajustado para maior conforto visual */
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  text-align: center;
  max-width: 800px;
  margin: 30px auto; /* Melhorado para um espaçamento mais equilibrado */
`;

export const Description = styled.div`
  color: ${({ theme }) => theme['gray-800']};
  text-align: center;
  padding: 20px;
  font-size: 1.1rem; /* Melhorado para legibilidade */
  line-height: 1.8; /* Aumentado para melhor espaçamento entre as linhas */

  h2 {
    color: ${({ theme }) => theme['gray-900']};
    margin-bottom: 20px; /* Adicionado espaçamento entre o título e o parágrafo */
  }

  p {
    margin-bottom: 15px; /* Ajustado para espaçamento mais confortável */
  }

  strong {
    color: ${({ theme }) => theme['green-500']};
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px; /* Mantido o espaçamento suficiente para separar o conteúdo */
`;
