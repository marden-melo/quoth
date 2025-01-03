export const maskCep = (value: string) => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
};
