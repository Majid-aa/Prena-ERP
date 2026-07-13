import api from './api';

export const productService = {
  getProducts: async () => {
    const res = await api.get('/product');
    return res.data?.data || res.data || [];
  },
  createProduct: async (data: any) => {
    const res = await api.post('/product', data);
    return res.data;
  },
};