interface IProductServices {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
  surcharge?: number;
  fees?: number;
  paymentMethod?: string;
  installments?: number;
  totalValue: number;
}

interface IBonus {
  id: string;
  description: string;
  type: 'percentage' | 'value';
  value: number;
  percentage: number;
}

export const calculateFinalValues = (
  selectedItems: IProductServices[],
  selectedBonuses: IBonus[],
  watch: (key: string) => number | string | undefined
) => {
  const totalProducts = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = parseFloat(String(watch('discount') || 0));
  const surcharge = parseFloat(String(watch('surcharge') || 0));
  const fees = parseFloat(String(watch('fees') || 0));
  const installments = parseInt(String(watch('installments') || 0), 10);

  const totalWithDiscountAndSurcharge =
    totalProducts -
    (totalProducts * discount) / 100 +
    (totalProducts * surcharge) / 100;

  const totalWithBonuses = selectedBonuses.reduce((total, bonus) => {
    if (bonus.type === 'percentage') {
      return total - (total * bonus.percentage) / 100;
    } else {
      return total - bonus.value;
    }
  }, totalWithDiscountAndSurcharge);

  const totalWithFees =
    fees > 0
      ? totalWithBonuses + (totalWithBonuses * fees) / 100
      : totalWithBonuses;

  const installmentValue =
    installments > 0 ? totalWithFees / installments : totalWithFees;

  return {
    totalProducts,
    totalWithBonuses,
    totalWithFees,
    installmentValue,
  };
};
