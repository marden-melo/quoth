import { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  cancel?: boolean;
}

export const Button = ({ children, cancel, ...props }: ButtonProps) => {
  return (
    <StyledButton cancel={cancel} {...props}>
      {children}
    </StyledButton>
  );
};
