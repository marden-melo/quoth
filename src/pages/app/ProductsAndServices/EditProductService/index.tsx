import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
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
  CategoryButton,
  CategoryWrapper,
} from './styles';
import { Sidebar } from '../../Sidebar';
import { ArrowCircleLeft, Plus } from 'phosphor-react';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '@/lib/axios';
import { Loading } from '@/components/Loading'; // Importe o componente de loading

interface ProductServiceInterface {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  type: 'PRODUCT' | 'SERVICE';
}

export function EditProductAndService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Defina o estado de carregamento
  const [productData, setProductData] =
    useState<ProductServiceInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductServiceInterface>();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      try {
        const { data } = await api.get(`/product-or-service/${id}`);
        setProductData(data.data);

        setValue('name', data.data.name);
        setValue('description', data.data.description);
        setValue('price', data.data.price);
        setValue('category', data.data.category.name);
        setValue('quantity', data.data.quantity);
        setValue('type', data.data.type);
      } catch (error) {
        toast.error('Erro ao carregar os dados do produto/serviço.', {
          position: 'top-right',
        });
      } finally {
        setLoading(false); // Defina o estado como falso quando os dados forem carregados
      }
    };

    fetchProductData();
  }, [id, setValue]);

  const onSubmit = async (data: ProductServiceInterface) => {
    if (!productData) return;

    setIsSubmitting(true);
    try {
      const response = await api.put(`/product-or-service/${id}`, data);
      if (response.status === 200) {
        toast.success('Produto/Serviço atualizado com sucesso!', {
          position: 'top-right',
        });
        setTimeout(() => {
          navigate('/see-product-services');
        }, 1500);
      }
    } catch (error) {
      toast.error('Erro ao atualizar o produto/serviço.', {
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/see-product-services');
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
          <Title>Editar Produto ou Serviço</Title>
        </ArrowTitleContainer>

        {loading ? (
          <Loading />
        ) : (
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
                {errors.description && (
                  <span>{errors.description.message}</span>
                )}
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
                    render={({ field }) => <Input {...field} id="category" />}
                  />
                  {errors.category && <span>{errors.category.message}</span>}
                </FormField>
                <CategoryButton onClick={() => {}} type="button">
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

              {/* Tipo é somente visual e não editável */}
              <FormField>
                <label htmlFor="type">Tipo</label>
                <div>
                  {productData?.type === 'PRODUCT' ? 'Produto' : 'Serviço'}
                </div>
              </FormField>
            </FormRowHalf>

            <FormRowBottom>
              <Button
                type="submit"
                backgroundColor={theme['cyen-700']}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Atualizando' : 'Atualizar'}
              </Button>
              <Button
                type="button"
                backgroundColor={theme.red}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </FormRowBottom>
          </Form>
        )}
      </Content>
    </Container>
  );
}
