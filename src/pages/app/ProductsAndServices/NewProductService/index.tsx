import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Plus } from 'phosphor-react';
import { useTheme } from 'styled-components';
import {
  Container,
  Content,
  Title,
  Form,
  FormField,
  FormRowHalf,
  FormRowBottom,
  ArrowTitleContainer,
  CategoryWrapper,
  CategoryButton,
} from './styles';
import { Sidebar } from '../../Sidebar';
import { ArrowCircleLeft } from 'phosphor-react';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '@/lib/axios';

interface ProductServiceFormInputs {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  type: 'PRODUCT' | 'SERVICE';
}

interface Category {
  id: string;
  name: string;
}

export function NewProductService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
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
      type: 'PRODUCT',
    },
  });
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log('Categorias:', response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        setCategories(data);
      } catch (error) {
        toast.error('Erro ao carregar categorias.');
      }
    };
    fetchCategories();
  }, []);

  const handleCancel = () => {
    reset();
  };

  const handleAddCategory = () => {
    console.log('Abrir modal ou ação para adicionar nova categoria');
  };

  const onSubmit = async (data: ProductServiceFormInputs) => {
    setIsSubmitting(true);
    try {
      const payload = {
        categoryId: data.category,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        type: data.type,
        description: data.description,
      };
      await api.post('/product-or-service', payload);
      toast.success('Produto ou Serviço cadastrado com sucesso!');
      reset();
      setTimeout(() => {
        navigate('/productsservices');
      }, 3000);
    } catch (error) {
      toast.error('Erro ao cadastrar Produto ou Serviço.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ArrowTitleContainer>
          <ArrowCircleLeft
            size={32}
            color={theme['gray-500']}
            onClick={() => navigate('/productsservices')}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <Title>Cadastrar Produto ou Serviço</Title>
        </ArrowTitleContainer>
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

            <CategoryWrapper>
              <FormField>
                <label htmlFor="category">Categoria</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Categoria é obrigatória' }}
                  render={({ field }) => (
                    <select {...field} id="category">
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.category && <span>{errors.category.message}</span>}
              </FormField>
              <CategoryButton onClick={handleAddCategory} type="button">
                <Plus size={24} color={theme['green-500']} />
              </CategoryButton>
            </CategoryWrapper>

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

            <FormField>
              <label htmlFor="type">Tipo</label>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Tipo é obrigatório' }}
                render={({ field }) => (
                  <select {...field} id="type">
                    <option value="PRODUCT">Produto</option>
                    <option value="SERVICE">Serviço</option>
                  </select>
                )}
              />
              {errors.type && <span>{errors.type.message}</span>}
            </FormField>
          </FormRowHalf>

          <FormRowBottom>
            <Button
              type="submit"
              backgroundColor={theme['green-300']}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <Button
              type="button"
              backgroundColor={theme['red-300']}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </FormRowBottom>
        </Form>
      </Content>
    </Container>
  );
}
