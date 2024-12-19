import { Button } from './styles';

interface IconButtonProps {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
}

export function IconButton({ icon, text, onClick }: IconButtonProps) {
  return (
    <Button onClick={onClick}>
      <span>{icon}</span>
      <span>{text}</span>
    </Button>
  );
}
