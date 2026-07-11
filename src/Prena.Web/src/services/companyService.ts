import api from './api';

export const companyService = {
  getCompanies: async () => {
    const res = await api.get('/company');
    if (res.data?.success && Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data)) return res.data;
    return [];
  },
};
