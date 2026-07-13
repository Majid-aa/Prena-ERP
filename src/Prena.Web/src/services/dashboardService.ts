import api from './api';

export const dashboardService = {
  getSummary: async () => {
    try {
      const [usersRes, companiesRes, vouchersRes] = await Promise.all([
        api.get('/user'),
        api.get('/company'),
        api.get('/voucher')
      ]);
      const users = usersRes.data?.data || usersRes.data || [];
      const companies = companiesRes.data?.data || companiesRes.data || [];
      const vouchers = vouchersRes.data?.data || vouchersRes.data || [];
      return {
        totalUsers: users.length,
        activeUsers: users.filter((u: any) => u.status === 'active').length,
        totalCompanies: companies.length,
        totalVouchers: vouchers.length,
      };
    } catch {
      return { totalUsers: 0, activeUsers: 0, totalCompanies: 0, totalVouchers: 0 };
    }
  },
};