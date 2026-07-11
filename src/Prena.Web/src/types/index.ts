export interface User {
  id: string;
  fullName: string;
  mobile: string;
  isSuperAdmin: boolean;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
  companies: Company[];
}
