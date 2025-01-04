import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'phosphor-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  FormWrapper,
  Logo,
  Title,
  Input,
  Button,
  LinkText,
  BackgroundImage,
  Overlay,
  BackButton,
} from './styles';
import logo from '@/assets/logo_quoth300.png';
import backgroundImage from '@/assets/login_background_light.png';

const customToastStyle = {
  success: {
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    backgroundColor: '#dc3545',
    color: 'white',
    fontWeight: 'bold',
  },
  info: {
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
  },
};

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    toast.info('Acessando.', {
      autoClose: false,
      style: customToastStyle.info,
    });

    try {
      const success = await login(email, password);

      if (success) {
        toast.dismiss();
        toast.success('Login realizado com sucesso!', {
          autoClose: 3000,
          style: customToastStyle.success,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        navigate('/');
      } else {
        toast.dismiss();
        toast.error('Erro ao fazer login', { style: customToastStyle.error });
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao fazer login', { style: customToastStyle.error });
    }
  };

  const handleGoBack = () => {
    navigate('/apresentation');
  };

  return (
    <Container>
      <BackgroundImage src={backgroundImage} alt="Background" />
      <Overlay />
      <BackButton onClick={handleGoBack}>
        <ArrowLeft size={24} color="#fff" />
      </BackButton>
      <FormWrapper>
        <Logo src={logo} alt="Application Logo" />
        <Title>Bem-vindo</Title>
        <form onSubmit={handleSignIn}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Acessar</Button>
        </form>
        <LinkText onClick={() => navigate('/forgot-password')}>
          Esqueceu sua senha?
        </LinkText>
        <LinkText onClick={() => navigate('/create-account')}>
          Crie sua conta Quoth! Clique aqui.
        </LinkText>
      </FormWrapper>

      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeButton={false}
        theme="dark"
      />
    </Container>
  );
}
