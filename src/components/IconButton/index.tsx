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
      <div style={{ marginTop: 3 }}>
        <span>{icon}</span>
      </div>
      <span>{text}</span>
    </Button>
  );
}
