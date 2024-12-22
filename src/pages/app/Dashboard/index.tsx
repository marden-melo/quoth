import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import {
  Container,
  Content,
  Title,
  FilterContainer,
  FilterSelect,
} from './styles';
import { Chart } from 'react-google-charts';

const mockDataMonthly = [
  ['Mês', 'Total', 'Aprovado', 'Rejeitado'],
  ['Jan', 3000, 2500, 500],
  ['Feb', 4000, 3500, 500],
  ['Mar', 3500, 3000, 500],
  ['Apr', 5000, 4500, 500],
  ['May', 4500, 4000, 500],
  ['Jun', 4000, 3500, 500],
  ['Jul', 3800, 3300, 500],
  ['Aug', 4200, 3700, 500],
  ['Sep', 3900, 3400, 500],
  ['Oct', 4700, 4200, 500],
  ['Nov', 4900, 4400, 500],
  ['Dec', 5100, 4600, 500],
];

const mockDataYearly = [
  ['Ano', 'Total', 'Aprovado', 'Rejeitado'],
  ['2023', 30000, 25000, 5000],
  ['2024', 40000, 35000, 5000],
  ['2025', 45000, 40000, 5000],
];

const mockDataBar = [
  ['Mês', 'Total', 'Aprovado', 'Rejeitado'],
  ['Jan', 3000, 2500, 500],
  ['Feb', 4000, 3500, 500],
  ['Mar', 3500, 3000, 500],
];

const mockDataArea = [
  ['Mês', 'Aprovado', 'Rejeitado'],
  ['Jan', 2500, 500],
  ['Feb', 3500, 500],
  ['Mar', 3000, 500],
];

const mockDataPie = [
  ['Categoria', 'Valor'],
  ['Aprovado', 25000],
  ['Rejeitado', 5000],
  ['Em andamento', 15000],
];

const mockDataStackedBar = [
  ['Ano', 'Aprovado', 'Rejeitado'],
  ['2023', 20000, 5000],
  ['2024', 25000, 5000],
  ['2025', 30000, 5000],
];

export function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());

  function getCurrentMonth() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[new Date().getMonth()];
  }

  function getCurrentYear() {
    return new Date().getFullYear().toString();
  }

  useEffect(() => {
    if (selectedPeriod === 'monthly') {
      setSelectedMonth(getCurrentMonth());
    } else {
      setSelectedYear(getCurrentYear());
    }
  }, [selectedPeriod]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const dataToDisplay =
    selectedPeriod === 'monthly'
      ? mockDataMonthly
      : mockDataYearly.filter((item) => item[0] === selectedYear);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Dashboard</Title>

        <FilterContainer>
          <FilterSelect onChange={handlePeriodChange} value={selectedPeriod}>
            <option value="monthly">Mês</option>
            <option value="yearly">Ano</option>
          </FilterSelect>

          {selectedPeriod === 'monthly' ? (
            <FilterSelect onChange={handleMonthChange} value={selectedMonth}>
              {mockDataMonthly.map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))}
            </FilterSelect>
          ) : (
            <FilterSelect onChange={handleYearChange} value={selectedYear}>
              {mockDataYearly.map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))}
            </FilterSelect>
          )}
        </FilterContainer>

        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={dataToDisplay}
          options={{
            title:
              selectedPeriod === 'monthly' ? 'Dados Mensais' : 'Dados Anuais',
            hAxis: {
              title: selectedPeriod === 'monthly' ? 'Mês' : 'Ano',
            },
            vAxis: {
              title: 'Valor',
            },
            colors: ['#8884d8', '#82ca9d', '#ff7300'],
            curveType: 'function',
            legend: { position: 'bottom' },
          }}
        />

        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={mockDataBar}
          options={{
            title: 'Gráfico de Barras',
            hAxis: { title: 'Mês' },
            vAxis: { title: 'Valor' },
            colors: ['#8884d8', '#82ca9d', '#ff7300'],
          }}
        />

        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={mockDataArea}
          options={{
            title: 'Gráfico de Área',
            hAxis: { title: 'Mês' },
            vAxis: { title: 'Valor' },
            colors: ['#8884d8', '#ff7300'],
          }}
        />

        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={mockDataPie}
          options={{
            title: 'Distribuição de Categorias',
            is3D: true,
            slices: {
              0: { offset: 0.1 },
              1: { offset: 0.1 },
              2: { offset: 0.1 },
            },
          }}
        />

        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={mockDataStackedBar}
          options={{
            title: 'Gráfico de Barras Empilhadas',
            isStacked: true,
            hAxis: { title: 'Ano' },
            vAxis: { title: 'Valor' },
            colors: ['#8884d8', '#82ca9d'],
          }}
        />
      </Content>
    </Container>
  );
}
