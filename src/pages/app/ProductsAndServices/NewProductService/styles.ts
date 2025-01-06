import styled from 'styled-components';
import { PencilSimple, Trash } from 'phosphor-react';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export const ArrowTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme['gray-900']};
  margin-left: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    color: ${({ theme }) => theme['gray-800']};
    margin-bottom: 8px;
  }

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme['red-500']};
    margin-top: 4px;
  }

  input,
  select,
  textarea {
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme['gray-300']};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme['blue-300']};
    }
  }

  textarea {
    resize: none;
  }
`;

export const FormRowHalf = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRowBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme['blue-500']};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: ${({ theme }) => theme['gray-400']};
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({ theme }) => theme['blue-600']};
  }

  &:active {
    background-color: ${({ theme }) => theme['blue-700']};
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  select {
    flex: 1;
    width: 50rem;
  }
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.6rem;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme['gray-500']};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme['blue-100']};
  }

  &:active {
    background-color: ${({ theme }) => theme['blue-200']};
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  max-height: 200px;
  overflow-y: auto;
`;

export const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: ${({ theme }) => theme['gray-100']};
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  span {
    flex-grow: 1;
    margin-right: 10px;
    color: ${({ theme }) => theme['gray-700']};
  }
`;

export const EditIcon = styled(PencilSimple).attrs(({ theme }) => ({
  size: 20,
  color: theme['blue-500'],
}))`
  cursor: pointer;
  margin-right: 8px;
`;

export const DeleteIcon = styled(Trash).attrs(({ theme }) => ({
  size: 20,
  color: theme['red-500'],
}))`
  cursor: pointer;
`;
