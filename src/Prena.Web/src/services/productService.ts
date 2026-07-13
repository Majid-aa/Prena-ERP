import api from './api';

export const productService = {
  getProducts: async () => { const res = await api.get('/product'); return res.data?.data || []; },
  createProduct: async (data: any) => { const res = await api.post('/product', data); return res.data; },
  updateProduct: async (id: string, data: any) => { const res = await api.put('/product/' + id, data); return res.data; },
  deleteProduct: async (id: string) => { const res = await api.delete('/product/' + id); return res.data; },
};