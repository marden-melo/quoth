interface PaymentMethod {
  paymentMethod: string;
  installments: number | null;
  fees: number;
  observation?: string;
}

interface Item {
  id: string;
  quantity: number;
  price: number;
  totalValue: number;
}

interface Document {
  fileName: string;
  fileType: string;
  filePath: string;
}

export interface BudgetFormData {
  client: string;
  service: string;
  quantity: number;
  value: number;
  unitValue: number;
  date: string;
  description: string;
  status: string;
  paymentMethod: string;
  discount: number;
  surcharge: number;
  validity: string;
  responsible: string;
  dueDate: string;
  address: string;
  notes: string;
  budgetNumber: string;
  installments: number;
  fees: number;
  email: string;
  attachments: FileList;
  bonusDescription: string;
  bonusValue: number;
  bonusPercents: number;
  items: string[];
  selectedBonuses: string[];
  totalProducts: string;
  totalWithFees: string;
  installmentValue: string;
  observation?: string;
  totalOriginal: number;
  totalWithBonuses: number;
  finalValueWithInstallments: string | number;
  selectedPaymentMethods: PaymentMethod[];
  selectedItems: Item[];
  documents: Document[];
  additionalNotes: string;
}
