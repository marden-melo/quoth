export const formatCurrencyBRL = (value: string | number): string => {
  if (typeof value === 'string') {
    value = value.replace(/[^\d,]+/g, ''); // Remove caracteres não numéricos
  }

  const parts = value.toString().split(',');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '';

  // Formatar a parte inteira com separador de milhar
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Garantir que sempre tenha 2 casas decimais
  if (decimalPart.length < 2) {
    decimalPart = decimalPart.padEnd(2, '0');
  } else {
    decimalPart = decimalPart.substring(0, 2); // Limita a 2 casas decimais
  }

  return `R$ ${integerPart},${decimalPart}`;
};

// Converter o valor formatado para número
export const parseCurrencyBRL = (formattedValue: string): number => {
  const cleanValue = formattedValue.replace(/[^\d,]+/g, ''); // Remove caracteres não numéricos
  const numericValue = cleanValue.replace('.', '').replace(',', '.'); // Substitui a vírgula por ponto para converter em número
  return parseFloat(numericValue); // Converte para número
};
