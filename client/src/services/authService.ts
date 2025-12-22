import api from './api';
import type { IUser } from '../types';
// Define what the Login API expects
interface LoginResponse {
  token: string;
  user: IUser;
}

// The actual service object
const authService = {
  register: async (userData: any) => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (userData: any) => {
    const response = await api.post<LoginResponse>('/auth/login', userData);
    
    // DEBUGGING LOGS:
    console.log(" FULL SERVER RESPONSE:", response);
    console.log(" DATA OBJECT:", response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log("✅ Token saved successfully!");
    } else {
      console.error("❌ NO TOKEN FOUND in response.data!");
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
  
  // Helper to check if user is logged in
  getCurrentUser: () => {
    return localStorage.getItem('token');
  }
};

export default authService;