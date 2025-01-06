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
import { Loading } from '@/components/Loading';
import { CustomModal } from '@/components/customModal';

interface ProductServiceInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  categoryId?: string; // Corrigido para categoryId
}

interface Category {
  id: string;
  name: string;
}

export function EditProductAndService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [productData, setProductData] =
    useState<ProductServiceInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
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
        setValue('categoryId', data.data.categoryId); // Ajustado aqui
        setValue('quantity', data.data.quantity);
        setValue('type', data.data.type);
      } catch (error) {
        toast.error('Erro ao carregar os dados do produto/serviço.', {
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, setValue]);

  const onSubmit = async (data: ProductServiceInterface) => {
    if (!productData) return;

    setIsSubmitting(true);

    const payload: Partial<ProductServiceInterface> = {};

    if (data.name !== productData.name) payload.name = data.name;
    if (data.description !== productData.description)
      payload.description = data.description;
    if (data.price !== productData.price) payload.price = data.price;
    if (data.categoryId !== productData.categoryId)
      // Ajustado para categoryId
      payload.categoryId = data.categoryId;
    if (data.quantity !== productData.quantity)
      payload.quantity = data.quantity;
    if (data.type !== productData.type) payload.type = data.type;

    try {
      const response = await api.put(`/product-or-service/${id}`, payload);

      if (response.status === 200) {
        toast.success('Produto/Serviço atualizado com sucesso!', {
          position: 'top-right',
        });
        setTimeout(() => {
          navigate('/productsservices');
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
    navigate('/productsservices');
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setCategories(data);
    } catch (error) {
      toast.error('Erro ao carregar categorias.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async () => {
    try {
      if (!newCategoryName) {
        toast.error('O nome da categoria é obrigatório!');
        return;
      }

      const payload = { name: newCategoryName };
      const response = await api.post('/category', payload);
      const newCategory = response.data;

      toast.success('Categoria cadastrada com sucesso!');
      await fetchCategories();

      reset({
        ...productData,
        categoryId: newCategory.id,
      });

      handleCloseModal();
    } catch (error) {
      toast.error('Erro ao cadastrar categoria.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategoryName('');
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
                    name="categoryId" // Ajustado para categoryId
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
                  {errors.categoryId && (
                    <span>{errors.categoryId.message}</span>
                  )}
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

        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Cadastrar Nova Categoria"
          fields={[
            {
              placeholder: 'Nome da Categoria',
              value: newCategoryName,
              onChange: (e) => setNewCategoryName(e.target.value),
            },
          ]}
          categories={categories}
          onEdit={async (id, newName) => {
            try {
              await api.put(`/category/${id}`, { name: newName });
              toast.success('Categoria editada com sucesso!');
              fetchCategories();
            } catch {
              toast.error('Erro ao editar categoria.');
            }
          }}
          onDelete={async (id) => {
            try {
              await api.delete(`/category/${id}`);
              toast.success('Categoria excluída com sucesso!');
              fetchCategories();
            } catch {
              toast.error('Erro ao excluir categoria.');
            }
          }}
          onSubmit={handleCategorySubmit}
        />
      </Content>
    </Container>
  );
}
