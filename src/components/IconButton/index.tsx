import { Button } from './styles';

interface IconButtonProps {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function IconButton({ icon, text, onClick, style }: IconButtonProps) {
  return (
    <Button onClick={onClick} style={style}>
      <span>{icon}</span>
      <span>{text}</span>
    </Button>
  );
}
