import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

export interface IClient {
  id: string;
  fullName: string;
}

export const useClients = () => {
  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      return response.data.data as IClient[];
    } catch (error) {
      toast.error('Erro ao carregar clientes');
      throw error;
    }
  };
  return { fetchClients };
};
