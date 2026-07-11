import api from './api';

export const dashboardService = {
  getSummary: async () => {
    try {
      const [usersRes, companiesRes] = await Promise.all([
        api.get('/user'),
        api.get('/company')
      ]);
      const users = usersRes.data?.data || usersRes.data || [];
      const companies = companiesRes.data?.data || companiesRes.data || [];
      return {
        totalUsers: users.length,
        activeUsers: users.filter((u: any) => u.status === 'active').length,
        totalCompanies: companies.length,
      };
    } catch {
      return { totalUsers: 0, activeUsers: 0, totalCompanies: 0 };
    }
  },
};
