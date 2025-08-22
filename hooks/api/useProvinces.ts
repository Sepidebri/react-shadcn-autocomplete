import { Province } from '@/app/api/provinces/route';
import axios from 'axios';

export default function useProvinces() {
  const all = async ({ search, limit }: { search?: string; limit?: number } = {}) => {
    const response = await axios.get('/api/provinces', { params: { search, limit } });
    return response.data.data as Province[];
  };

  return { all };
}