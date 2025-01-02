import { IconButton } from '../IconButton';
import { Trash, ArrowCounterClockwise } from 'phosphor-react';
import { ModalActions, ModalBox, ModalTitle, Overlay } from './styles';

interface ModalConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalConfirm = ({
  message,
  onConfirm,
  onCancel,
}: ModalConfirmProps) => {
  return (
    <Overlay>
      <ModalBox>
        <ModalTitle>{message}</ModalTitle>
        <ModalActions>
          <IconButton
            text="Não"
            onClick={onCancel}
            icon={<ArrowCounterClockwise size={24} />}
          />
          <IconButton
            text="Sim"
            onClick={onConfirm}
            icon={<Trash size={24} color="red" />}
          />
        </ModalActions>
      </ModalBox>
    </Overlay>
  );
};
