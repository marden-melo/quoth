import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

export interface IProductServices {
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
  unitValue: number;
}

export const useProductsServices = () => {
  const fetchProductsServices = async () => {
    try {
      const response = await api.get('/products-or-services');
      return response.data.data as IProductServices[];
    } catch (error) {
      toast.error('Erro ao carregar produtos ou serviços');
      throw error;
    }
  };
  return { fetchProductsServices };
};
