import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

export interface IBonus {
  id: string;
  description: string;
  type: 'percentage' | 'value';
  value: number;
  percentage: number;
}

export const useBonuses = () => {
  const fetchBonuses = async () => {
    try {
      const response = await api.get('/bonuses');
      const validBonuses = response.data.data.filter(
        (bonus: IBonus) => bonus.id && bonus.description
      );

      return validBonuses.map((bonus: IBonus) => ({
        ...bonus,
        type: bonus.percentage ? 'percentage' : 'value',
        value: bonus.value,
        percentage: bonus.percentage || 0,
      }));
    } catch (error) {
      toast.error('Erro ao carregar bônus');
      throw error;
    }
  };
  return { fetchBonuses };
};
