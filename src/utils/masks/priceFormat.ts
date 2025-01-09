export const formatCurrencyBRL = (value: string | number): string => {
  if (typeof value === 'string') {
    value = value.replace(/[^\d,]+/g, '');
  }

  const parts = value.toString().split(',');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '';

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (decimalPart.length < 2) {
    decimalPart = decimalPart.padEnd(2, '0');
  } else {
    decimalPart = decimalPart.substring(0, 2);
  }

  return `R$ ${integerPart},${decimalPart}`;
};

export const parseCurrencyBRL = (formattedValue: string): number => {
  const cleanValue = formattedValue.replace(/[^\d,]+/g, '');
  const numericValue = cleanValue.replace('.', '').replace(',', '.');
  return parseFloat(numericValue);
};
