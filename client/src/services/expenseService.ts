import api from './api';
import type { IExpense } from '../types';

const expenseService = {
  // Get all expenses
  getAll: async () => {
    const response = await api.get<IExpense[]>('/expenses');
    return response.data;
  },

  // Add a new expense
  create: async (expenseData: Omit<IExpense, '_id' | 'user'>) => {
    const response = await api.post<IExpense>('/expenses', expenseData);
    return response.data;
  },

  // Delete an expense
  delete: async (id: string) => {
    const response = await api.delete<{ msg: string }>(`/expenses/${id}`);
    return response.data;
  }
};

export default expenseService;