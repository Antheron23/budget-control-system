import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  
  // 1. Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: ''
  });

  const { title, amount, category } = formData;

  // 2. Budget Logic
  // Calculate total spent using .reduce()
  const totalSpent = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const budgetLimit = 5000; // Set your monthly limit here
  const isOverBudget = totalSpent > budgetLimit;

  // Handle typing in form
  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Add Expense
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newExpense = { title, amount, category };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post('/api/expenses', newExpense, config);
      
      // Update list immediately
      setExpenses([res.data, ...expenses]);
      
      // Clear form
      setFormData({ title: '', amount: '', category: '' });
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  // Handle Delete Expense
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };

      await axios.delete(`/api/expenses/${id}`, config);

      // Remove from UI
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // Fetch Expenses on Load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchExpenses = async () => {
      try {
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('/api/expenses', config);
        setExpenses(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchExpenses();
  }, [navigate]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header & Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard</h1>
        <button 
          onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
          style={{ padding: '8px 16px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </div>

      {/* Budget Summary Card */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: isOverBudget ? '#ffe6e6' : '#e6ffe6', // Light Red or Light Green
        border: `2px solid ${isOverBudget ? '#ff4d4d' : '#4caf50'}`,
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Total Spent: ₹{totalSpent}</h2>
        <p style={{ margin: 0 }}>Budget Limit: ₹{budgetLimit}</p>
        {isOverBudget && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>⚠️ You have exceeded your budget!</p>}
      </div>

      {/*Expense Form */}
      <div style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>Add New Expense</h3>
        <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" placeholder="Title (e.g. Pizza)" name="title" 
            value={title} onChange={onChange} required 
            style={{ padding: '10px', flex: '1' }}
          />
          <input 
            type="number" placeholder="Amount (₹)" name="amount" 
            value={amount} onChange={onChange} required 
            style={{ padding: '10px', width: '100px' }}
          />
          <input 
            type="text" placeholder="Category" name="category" 
            value={category} onChange={onChange} required 
            style={{ padding: '10px', flex: '1' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add
          </button>
        </form>
      </div>

      {/* Expense List */}
      <h3>Transaction History</h3>
      {expenses.length === 0 ? <p>No expenses recorded yet.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li key={expense._id} style={{ 
              borderBottom: '1px solid #eee', 
              padding: '15px 10px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff'
            }}>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{expense.title}</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  {expense.category} | {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                  ₹{expense.amount}
                </span>
                <button 
                  onClick={() => deleteExpense(expense._id)}
                  style={{ 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 12px', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;