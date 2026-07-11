import api from './api';

export const dashboardService = {
  getSummary: async () => {
    const res = await api.get('/user');
    const users = res.data?.data || res.data || [];
    return {
      totalUsers: users.length,
      activeUsers: users.filter((u: any) => u.status === 'active').length,
    };
  },
};
