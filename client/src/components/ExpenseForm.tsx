import React, { useState } from 'react';
import expenseService from '../services/expenseService';
import type { IExpense } from '../types';

interface Props {
  onExpenseAdded: (expense: IExpense) => void;
}

const ExpenseForm = ({ onExpenseAdded }: Props) => {
  // 1. State now uses "title" instead of "description"
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const { title, amount, category, date } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // This updates the state based on the "name" attribute of the input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 2. We send "title" to the backend
      const newExpense = await expenseService.create({ 
        title, 
        amount: Number(amount), 
        category, 
        date 
      });
      
      onExpenseAdded(newExpense);
      
      // Reset form
      setFormData({ title: '', amount: 0, category: 'Food', date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
      <h3>Add New Expense</h3>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        
        {/* 3. The input "name" and "value" must match the state EXACTLY */}
        <input 
          type="text" 
          name="title"        // <--- Must match state key
          placeholder="Title (e.g. Coffee)" 
          value={title}       // <--- Must match variable
          onChange={onChange} 
          required 
        />

        <input 
          type="number" 
          name="amount" 
          placeholder="Amount" 
          value={amount} 
          onChange={onChange} 
          required 
        />
        
        <select name="category" value={category} onChange={onChange}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        
        <input 
          type="date" 
          name="date" 
          value={date} 
          onChange={onChange} 
          required 
        />
        
        <button type="submit">Add +</button>
      </form>
    </div>
  );
};

export default ExpenseForm;