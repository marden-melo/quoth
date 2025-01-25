export const paymentMethodLabels = {
  PIX: 'PIX',
  CASH: 'Dinheiro',
  BOLETO: 'Boleto Bancário',
  BANK_TRANSFER: 'Transferência Entre Contas',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
} as const;

export interface PaymentMethod {
  id: string;
  paymentMethod: keyof typeof paymentMethodLabels;
  installments?: number;
  fees: number;
  observation?: string;
}
