// src/types/index.ts

export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface IExpense {
  _id: string;
title: string;
  amount: number;
  date: string;
  category: string;
  user?: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}