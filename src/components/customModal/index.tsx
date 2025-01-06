import React from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalOverlay, ModalContent } from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }[];
  onSubmit: () => void;
}

export const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {fields.map((field, index) => (
          <div key={index}>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button onClick={onSubmit} style={{ padding: '8px 16px' }}>
            Salvar
          </Button>
          <Button
            onClick={onClose}
            backgroundColor="#f44336"
            style={{ padding: '8px 16px' }}
          >
            Cancelar
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};
