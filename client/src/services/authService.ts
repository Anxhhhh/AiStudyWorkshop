import apiClient from './apiClient';

export interface User {
  id?: string;
  name?: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  user?: User; // Backend currently only returns token and message, but we might want user data later
}

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: any): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
