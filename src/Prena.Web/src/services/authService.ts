import api from './api';

export const authService = {
  requestOtp: async (mobile: string) => {
    const res = await api.post('/auth/request-otp', { mobile });
    return res.data;
  },
  verifyOtp: async (mobile: string, code: string) => {
    const res = await api.post('/auth/verify-otp', { mobile, code });
    return res.data;
  },
  getCurrentUser: async () => {
    const res = await api.get('/user/me');
    return res.data;
  },
};
