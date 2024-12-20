import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/default';
import { GlobalStyle } from './styles/global';
import { RoutesComponent } from './routes';
import { Apresentation } from './pages/auth/Apresentation';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Apresentation />
    </ThemeProvider>
  );
}
