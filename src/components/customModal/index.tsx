import { useState, ChangeEventHandler } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  ModalOverlay,
  ModalContent,
  CategoryList,
  CategoryItem,
  EditInput,
} from './styles';
import { X } from 'phosphor-react';
import { useTheme } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: {
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onSubmit: () => void;
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  fields,
  categories,
  onEdit,
  onDelete,
  onSubmit,
}: ModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const theme = useTheme();

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      onEdit(editingId, editValue);
      setEditingId(null);
      setEditValue('');
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1.5rem' }}>{title}</h2>
        {fields.map((field, index) => (
          <div key={index}>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem key={category.id}>
              {editingId === category.id ? (
                <>
                  <EditInput
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <Button onClick={handleSaveEdit}>Salvar</Button>
                </>
              ) : (
                <>
                  <span onClick={() => handleEdit(category.id, category.name)}>
                    {category.name}
                  </span>
                  <X
                    size={20}
                    color={theme.red}
                    onClick={() => onDelete(category.id)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </>
              )}
            </CategoryItem>
          ))}
        </CategoryList>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button onClick={onSubmit} style={{ padding: '8px 16px' }}>
            Salvar
          </Button>
          <Button
            onClick={onClose}
            backgroundColor={theme.red}
            style={{ padding: '8px 16px' }}
          >
            Cancelar
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
