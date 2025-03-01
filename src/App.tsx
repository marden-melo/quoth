import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default';
import { GlobalStyle } from './styles/global';
import { RoutesComponent } from './routes';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <GlobalStyle />
      <RoutesComponent />
    </ThemeProvider>
  );
}
