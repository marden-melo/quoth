import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useTheme } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '@/lib/axios';
import {
  Container,
  Content,
  Title,
  Form,
  FormRowCustom,
  FormRowBottom,
  ArrowTitleContainer,
  CategoryButton,
} from './styles';
import { Sidebar } from '../../Sidebar';
import { ArrowCircleLeft } from 'phosphor-react';
import { SectionTitle } from '../../Budget/styles';

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

export function EditProductAndService() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductServiceFormInputs>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data.data);
      } catch (error) {
        toast.error('Erro ao carregar as categorias.');
      }
    };

    const fetchProductServiceData = async () => {
      if (!id) return;

      try {
        const { data } = await api.get(`/product-service/${id}`);
        const productServiceData = data.data as ProductServiceFormInputs;

        setValue('name', productServiceData.name);
        setValue('description', productServiceData.description);
        setValue('price', productServiceData.price);
        setValue('category', productServiceData.category);
        setValue('quantity', productServiceData.quantity);
        setValue('type', productServiceData.type);
      } catch (error) {
        toast.error('Erro ao carregar os dados do produto/serviço.');
      } finally {
      }
    };

    fetchCategories();
    fetchProductServiceData();
  }, [id, setValue]);

  const onSubmit = async (data: ProductServiceFormInputs) => {
    setIsSubmitting(true);
    try {
      const response = await api.put(`/product-service/${id}`, data);
      if (response.status === 200) {
        toast.success('Produto/Serviço atualizado com sucesso!');
        navigate('/see-product-service');
      }
    } catch (error) {
      toast.error('Erro ao atualizar os dados do produto/serviço.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: '',
      description: '',
      price: 0,
      category: '',
      quantity: 0,
      type: 'PRODUCT',
    });
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
            onClick={() => navigate('/see-product-service')}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <Title>Editar Produto/Serviço</Title>
        </ArrowTitleContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Tipo de Produto/Serviço</SectionTitle>
          <FormRowCustom>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <CategoryButton
                    active={field.value === 'PRODUCT'}
                    onClick={() => setValue('type', 'PRODUCT')}
                  >
                    Produto
                  </CategoryButton>
                  <CategoryButton
                    active={field.value === 'SERVICE'}
                    onClick={() => setValue('type', 'SERVICE')}
                  >
                    Serviço
                  </CategoryButton>
                </>
              )}
            />
          </FormRowCustom>

          <SectionTitle>Informações</SectionTitle>
          <FormRowCustom>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nome"
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Descrição"
                  error={errors.description?.message}
                />
              )}
            />
          </FormRowCustom>

          <FormRowCustom>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Preço"
                  type="number"
                  error={errors.price?.message}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Quantidade"
                  type="number"
                  error={errors.quantity?.message}
                />
              )}
            />
          </FormRowCustom>

          <SectionTitle>Categoria</SectionTitle>
          <FormRowCustom>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  style={{ padding: '8px', borderRadius: '4px' }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </FormRowCustom>

          <FormRowBottom>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Editando...' : 'Editar'}
            </Button>
            <Button type="button" onClick={handleCancel}>
              Cancelar
            </Button>
          </FormRowBottom>
        </Form>
      </Content>
    </Container>
  );
}
