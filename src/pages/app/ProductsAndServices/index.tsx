import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Sidebar } from '../Sidebar';
import { Input } from '@/components/Input';
import { PlusCircle, Pencil, Eye, Trash } from 'phosphor-react';
import { IconButton } from '@/components/IconButton';
import { useTheme } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ActionIcons,
  Container,
  Content,
  IconButtonWrapper,
  ProductDetails,
  ProductInfo,
  ProductItem,
  ProductList,
  SearchWrapper,
  Title,
  MessageWrapper,
} from './styles';
import { api } from '@/lib/axios';
import { Loading } from '@/components/Loading';

interface Category {
  id: string;
  name: string;
}

interface ProductServiceFormInputs {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
}

export function ProductsAndServices() {
  const [products, setProducts] = useState<ProductServiceFormInputs[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductServiceFormInputs>();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products-or-services');

        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        toast.error('Erro ao carregar os produtos e serviços');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data: ProductServiceFormInputs) => {
    console.log(data);
    reset();
  };

  const handleNavigation = () => {
    navigate('/products-services-list');
  };

  const handleEdit = (id: string) => {
    console.log(`Editando item ${id}`);
  };

  const handleView = (id: string) => {
    console.log(`Exibindo detalhes do item ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Excluindo item ${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Produtos e Serviços</Title>

        <SearchWrapper>
          <Input
            type="text"
            placeholder="Pesquisar produto ou serviço"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
          <IconButtonWrapper>
            <IconButton
              icon={<PlusCircle size={26} />}
              onClick={() => navigate('/add-product-service')}
              text="Cadastrar Novo"
              style={{ backgroundColor: theme['green-200'] }}
            />
          </IconButtonWrapper>
        </SearchWrapper>

        {loading ? (
          <Loading />
        ) : filteredProducts.length > 0 ? (
          <ProductList>
            {filteredProducts.map((product) => (
              <ProductItem key={product.id}>
                <ProductInfo>
                  <h3>{product.name}</h3>
                  <ProductDetails>
                    <p>
                      <strong>Preço:</strong> {product.price}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {product.category.name}{' '}
                      {/* Corrigido para acessar o nome da categoria */}
                    </p>
                    <p>
                      <strong>Quantidade:</strong> {product.quantity}
                    </p>
                  </ProductDetails>
                  <p>{product.description}</p>
                </ProductInfo>
                <ActionIcons>
                  <IconButton
                    onClick={() => handleEdit(product.id)}
                    icon={<Pencil size={24} color={theme['blue-500']} />}
                    text="Editar"
                  />
                  <IconButton
                    onClick={() => handleDelete(product.id)}
                    icon={<Trash size={24} color={theme['red-500']} />}
                    text="Excluir"
                  />
                </ActionIcons>
              </ProductItem>
            ))}
          </ProductList>
        ) : (
          <MessageWrapper>
            <p>Não há produtos ou serviços cadastrados.</p>
          </MessageWrapper>
        )}
      </Content>
      <ToastContainer />
    </Container>
  );
}
