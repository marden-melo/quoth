import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useTheme } from 'styled-components';
import {
  Container,
  Content,
  Title,
  Form,
  FormField,
  ButtonWrapper,
  FormRowHalf,
  FormRowBottom,
} from './styles';
import { Sidebar } from '../../Sidebar';

interface ProductServiceFormInputs {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
}

export function NewProductService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<string[]>([]); // Estado para as categorias
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductServiceFormInputs>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      quantity: 0,
    },
  });
  const navigate = useNavigate();
  const theme = useTheme();

  // Mock de categorias (como se fosse vindo de uma API)
  useEffect(() => {
    const mockCategories = [
      'Categoria 1',
      'Categoria 2',
      'Categoria 3',
      'Categoria 4',
    ];
    setCategories(mockCategories); // Popula o estado com os dados mockados
  }, []);

  const handleCancel = () => {
    reset();
  };

  const onSubmit = async (data: ProductServiceFormInputs) => {
    setIsSubmitting(true);
    console.log(data);
    reset();
    setIsSubmitting(false);
    navigate('/products-services-list');
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Cadastrar Novo Produto ou Serviço</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRowHalf>
            <FormField>
              <label htmlFor="name">Nome</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field }) => <Input {...field} id="name" />}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </FormField>

            <FormField>
              <label htmlFor="description">Descrição</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Descrição é obrigatória' }}
                render={({ field }) => <Input {...field} id="description" />}
              />
              {errors.description && <span>{errors.description.message}</span>}
            </FormField>

            <FormField>
              <label htmlFor="price">Preço</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Preço é obrigatório' }}
                render={({ field }) => (
                  <Input type="number" {...field} id="price" />
                )}
              />
              {errors.price && <span>{errors.price.message}</span>}
            </FormField>

            <FormField>
              <label htmlFor="category">Categoria</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Categoria é obrigatória' }}
                render={({ field }) => (
                  <select {...field} id="category">
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category && <span>{errors.category.message}</span>}
            </FormField>

            <FormField>
              <label htmlFor="quantity">Quantidade</label>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: 'Quantidade é obrigatória' }}
                render={({ field }) => (
                  <Input type="number" {...field} id="quantity" />
                )}
              />
              {errors.quantity && <span>{errors.quantity.message}</span>}
            </FormField>
          </FormRowHalf>

          <FormRowBottom>
            <Button type="submit" backgroundColor={theme['green-300']}>
              Cadastrar
            </Button>
            <Button type="button" onClick={handleCancel} cancel>
              Cancelar
            </Button>
          </FormRowBottom>
        </Form>
      </Content>
    </Container>
  );
}
