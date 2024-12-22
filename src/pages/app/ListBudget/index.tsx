import { Sidebar } from '../Sidebar';
import { IconButton } from '@/components/IconButton';
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
  Status,
  IconButtonWrapper,
} from './styles';
import { CheckCircle, XCircle, Hourglass, Article } from 'phosphor-react';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';

const mockBudgets = [
  {
    id: 1,
    title: 'Orçamento 001',
    client: 'João da Silva',
    service: 'Instalação de rede',
    quantity: 5,
    value: 'R$ 2.500,00',
    discount: '10%',
    responsible: 'Maria Oliveira',
    dueDate: '20/12/2024',
    status: 'Aprovado',
  },
  {
    id: 2,
    title: 'Orçamento 002',
    client: 'Empresa ABC',
    service: 'Manutenção de servidor',
    quantity: 1,
    value: 'R$ 1.000,00',
    discount: null,
    responsible: 'João Pereira',
    dueDate: '25/12/2024',
    status: 'Pendente',
  },
  {
    id: 3,
    title: 'Orçamento 003',
    client: 'Clínica XYZ',
    service: 'Consultoria em TI',
    quantity: 2,
    value: 'R$ 3.000,00',
    discount: '5%',
    responsible: 'Ana Lima',
    dueDate: '30/12/2024',
    status: 'Reprovado',
  },
];

export function ListBudget() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterClick = (status: string) => {
    setSelectedFilter(selectedFilter === status ? null : status);
  };

  const filteredBudgets = mockBudgets.filter((budget) => {
    const matchesSearch = budget.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter
      ? budget.status === selectedFilter
      : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Orçamentos emitidos</Title>
        <SearchBarWrapper>
          <SearchBar placeholder="Buscar orçamento" onSearch={handleSearch} />

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
          {filteredBudgets.map((budget) => (
            <Card key={budget.id}>
              <CardHeader>
                <h3>{budget.title}</h3>
                <Status status={budget.status}>{budget.status}</Status>
              </CardHeader>
              <CardDetails>
                <p>
                  <strong>Cliente:</strong> {budget.client}
                </p>
                <p>
                  <strong>Serviço:</strong> {budget.service}
                </p>
                <p>
                  <strong>Quantidade:</strong> {budget.quantity} unidade(s)
                </p>
                <p>
                  <strong>Valor:</strong> {budget.value}
                </p>
                {budget.discount && (
                  <p>
                    <strong>Desconto:</strong> {budget.discount}
                  </p>
                )}
                <p>
                  <strong>Responsável:</strong> {budget.responsible}
                </p>
              </CardDetails>
              <CardFooter>
                <span>
                  <strong>Data de Vencimento:</strong> {budget.dueDate}
                </span>
                <IconButtonWrapper>
                  <IconButton
                    text="Gerar PDF"
                    icon={<Article size={24} />}
                    onClick={() => alert(`Gerando PDF para ${budget.title}`)}
                  />
                </IconButtonWrapper>
              </CardFooter>
            </Card>
          ))}
        </CardContainer>
      </Content>
    </Container>
  );
}
