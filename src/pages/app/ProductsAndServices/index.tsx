import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../Sidebar';
import { Input } from '@/components/Input';
import { PlusCircle, Pencil, Trash } from 'phosphor-react';
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
import { ModalConfirm } from '@/components/modalConfirm';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (clientToDelete) {
      try {
        await api.delete(`/product-or-service/${clientToDelete}`);
        toast.success('Item deletado com sucesso!', {
          position: 'top-right',
        });
        fetchData();
      } catch (error) {
        toast.error('Erro ao deletar item.', { position: 'top-right' });
      } finally {
        closeDeleteModal();
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-product-service/${id}`);
  };

  const openDeleteModal = (id: string) => {
    setClientToDelete(id);
    setModalVisible(true);
  };

  const closeDeleteModal = () => {
    setModalVisible(false);
    setClientToDelete(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Produtos e Serviços</Title>
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
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(product.price)}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {product.category.name}{' '}
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
                    onClick={() => openDeleteModal(product.id)}
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
      {modalVisible && (
        <ModalConfirm
          message="Tem certeza que deseja excluir?"
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
        />
      )}
    </Container>
  );
}
