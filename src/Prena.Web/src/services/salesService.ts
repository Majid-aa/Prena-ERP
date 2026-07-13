import api from './api';

export const salesService = {
  getInvoices: async () => {
    const res = await api.get('/sales');
    return res.data?.data || res.data || [];
  },
  createInvoice: async (data: any) => {
    const res = await api.post('/sales', data);
    return res.data;
  },
};