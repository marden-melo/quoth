import { Sidebar } from '../Sidebar';
import { IconButton } from '@/components/IconButton'; // Utilizando o IconButton existente
import {
  Container,
  Content,
  Title,
  FiltersContainer,
  CardContainer,
  Card,
  CardHeader,
  CardDetails,
  CardFooter,
  SearchBarWrapper,
} from './styles';
import { CheckCircle, XCircle, Hourglass } from 'phosphor-react';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';

export function ListBudget() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (status: string) => {
    setSelectedFilter(selectedFilter === status ? null : status);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Orçamentos emitidos</Title>
        <SearchBarWrapper>
          <SearchBar
            placeholder="Buscar orçamento"
            onSearch={(e) => handleSearch(e.target.value)}
          />

          <FiltersContainer>
            <IconButton
              text="Aprovado"
              icon={<CheckCircle size={24} />}
              onClick={() => handleFilterClick('Aprovado')}
            />
            <IconButton
              text="Reprovado"
              icon={<XCircle size={24} />}
              onClick={() => handleFilterClick('Reprovado')}
            />
            <IconButton
              text="Pendente"
              icon={<Hourglass size={24} />}
              onClick={() => handleFilterClick('Pendente')}
            />
          </FiltersContainer>
        </SearchBarWrapper>

        <CardContainer>
          <Card>
            <CardHeader>
              <h3>Orçamento 001</h3>
              <p>Status: Aprovado</p>
            </CardHeader>
            <CardDetails>
              <p>
                <strong>Cliente:</strong> João da Silva
              </p>
              <p>
                <strong>Serviço:</strong> Instalação de rede
              </p>
              <p>
                <strong>Quantidade:</strong> 5 unidades
              </p>
              <p>
                <strong>Valor:</strong> R$ 2.500,00
              </p>
              <p>
                <strong>Desconto:</strong> 10%
              </p>
              <p>
                <strong>Responsável:</strong> Maria Oliveira
              </p>
            </CardDetails>
            <CardFooter>
              <span>
                <strong>Data de Vencimento:</strong> 20/12/2024
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h3>Orçamento 002</h3>
              <p>Status: Pendente</p>
            </CardHeader>
            <CardDetails>
              <p>
                <strong>Cliente:</strong> Empresa ABC
              </p>
              <p>
                <strong>Serviço:</strong> Manutenção de servidor
              </p>
              <p>
                <strong>Quantidade:</strong> 1 unidade
              </p>
              <p>
                <strong>Valor:</strong> R$ 1.000,00
              </p>
              <p>
                <strong>Responsável:</strong> João Pereira
              </p>
            </CardDetails>
            <CardFooter>
              <span>
                <strong>Data de Vencimento:</strong> 25/12/2024
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h3>Orçamento 001</h3>
              <p>Status: Aprovado</p>
            </CardHeader>
            <CardDetails>
              <p>
                <strong>Cliente:</strong> João da Silva
              </p>
              <p>
                <strong>Serviço:</strong> Instalação de rede
              </p>
              <p>
                <strong>Quantidade:</strong> 5 unidades
              </p>
              <p>
                <strong>Valor:</strong> R$ 2.500,00
              </p>
              <p>
                <strong>Desconto:</strong> 10%
              </p>
              <p>
                <strong>Responsável:</strong> Maria Oliveira
              </p>
            </CardDetails>
            <CardFooter>
              <span>
                <strong>Data de Vencimento:</strong> 20/12/2024
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h3>Orçamento 002</h3>
              <p>Status: Pendente</p>
            </CardHeader>
            <CardDetails>
              <p>
                <strong>Cliente:</strong> Empresa ABC
              </p>
              <p>
                <strong>Serviço:</strong> Manutenção de servidor
              </p>
              <p>
                <strong>Quantidade:</strong> 1 unidade
              </p>
              <p>
                <strong>Valor:</strong> R$ 1.000,00
              </p>
              <p>
                <strong>Responsável:</strong> João Pereira
              </p>
            </CardDetails>
            <CardFooter>
              <span>
                <strong>Data de Vencimento:</strong> 25/12/2024
              </span>
            </CardFooter>
          </Card>
          {/* Adicione mais cards conforme necessário */}
        </CardContainer>
      </Content>
    </Container>
  );
}
