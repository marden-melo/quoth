import { SelectHTMLAttributes, ReactNode } from 'react';
import { StyledSelect } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Select({ children, ...props }: SelectProps) {
  return <StyledSelect {...props}>{children}</StyledSelect>;
}
