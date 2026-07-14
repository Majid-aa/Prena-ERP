import api from './api';

export const accountService = {
  getAccounts: async () => {
    const res = await api.get('/account');
    return res.data?.data || [];
  },
};