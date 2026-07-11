import api from './api';

export const userService = {
  getUsers: async () => {
    const res = await api.get('/user');
    if (res.data?.success && Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data)) return res.data;
    return [];
  },
  createUser: async (data: any) => { const res = await api.post('/user', data); return res.data; },
  updateUser: async (id: string, data: any) => { const res = await api.put('/user/' + id, data); return res.data; },
  deleteUser: async (id: string) => { const res = await api.delete('/user/' + id); return res.data; },
};
