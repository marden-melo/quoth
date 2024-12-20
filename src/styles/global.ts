import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme['gray-900']};
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    overflow-x: hidden; 
  }

  body, input, textarea, button {
    font: 400 1rem Montserrat, sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

    ::-webkit-scrollbar {
    width: 8px; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme['gray-400']};  
    border-radius: 10px;  
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme['gray-200']};  
    border-radius: 10px;
  }
`;
