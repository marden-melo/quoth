import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Sidebar } from '../Sidebar';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { PlusCircle, Pencil, Eye, Trash } from 'phosphor-react';
import { IconButton } from '@/components/IconButton';
import { useTheme } from 'styled-components';
import {
  Container,
  Content,
  Title,
  IconButtonWrapper,
  ProductList,
  ProductItem,
  ActionIcons,
  SearchWrapper,
} from './styles';

interface ProductServiceFormInputs {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
}

export function ProductsAndServices() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductServiceFormInputs>();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const mockData = [
      {
        id: '1',
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 100,
        category: 'Categoria A',
        quantity: 10,
      },
      {
        id: '2',
        name: 'Serviço 1',
        description: 'Descrição do serviço 1',
        price: 200,
        category: 'Categoria B',
        quantity: 5,
      },
      {
        id: '3',
        name: 'Produto 2',
        description: 'Descrição do produto 2',
        price: 150,
        category: 'Categoria A',
        quantity: 20,
      },
    ];

    setProducts(mockData);
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

        <ProductList>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Preço:</strong> {product.price}
                </p>
                <p>
                  <strong>Categoria:</strong> {product.category}
                </p>
                <p>
                  <strong>Quantidade:</strong> {product.quantity}
                </p>
              </div>
              <ActionIcons>
                <IconButton
                  icon={<Pencil size={20} />}
                  onClick={() => handleEdit(product.id)}
                  text="Editar"
                />
                <IconButton
                  icon={<Eye size={20} />}
                  onClick={() => handleView(product.id)}
                  text="Ver"
                />
                <IconButton
                  icon={<Trash size={20} />}
                  onClick={() => handleDelete(product.id)}
                  text="Excluir"
                />
              </ActionIcons>
            </ProductItem>
          ))}
        </ProductList>
      </Content>
    </Container>
  );
}
