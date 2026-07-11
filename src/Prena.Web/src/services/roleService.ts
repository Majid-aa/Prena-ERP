import api from './api';

export const roleService = {
  getRoles: async () => {
    const res = await api.get('/role');
    if (res.data?.success && Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data)) return res.data;
    return [];
  },
};
