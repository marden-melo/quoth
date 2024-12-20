import { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  cancel?: boolean;
  backgroundColor?: string;
}

export const Button = ({
  children,
  cancel,
  backgroundColor,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton cancel={cancel} backgroundColor={backgroundColor} {...props}>
      {children}
    </StyledButton>
  );
};
