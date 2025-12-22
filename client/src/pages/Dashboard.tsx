import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import expenseService from '../services/expenseService';
import ExpenseForm from '../components/ExpenseForm'; // Import Form
import type { IExpense } from '../types';

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expenseService.getAll();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Function to add the new expense to the list without refreshing
  const handleExpenseAdded = (newExpense: IExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  // Function to delete an expense
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await expenseService.delete(id);
        // Remove from UI immediately
        setExpenses(expenses.filter(exp => exp._id !== id));
      } catch (error) {
        console.error("Error deleting expense", error);
      }
    }
  };

  if (loading) return <p>Loading your budget...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Welcome, {auth?.user?.username} 👋</h1>
        <button onClick={auth?.logout} style={{ backgroundColor: '#ff4444', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      {/* The New Form Component */}
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />

      <h2>Your Expenses</h2>
      
      {expenses.length === 0 ? (
        <p>No expenses found. Start spending! 💸</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li key={expense._id} style={{ 
              borderBottom: '1px solid #eee', 
              padding: '10px 0', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>{expense.title}</strong> 
                <span style={{ color: 'gray', marginLeft: '10px', fontSize: '0.9em' }}>
                  ({expense.category}) - {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
              
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '15px' }}>
                  Rs {expense.amount}
                </span>
                <button 
                  onClick={() => handleDelete(expense._id)}
                  style={{ backgroundColor: 'transparent', border: '1px solid #ccc', cursor: 'pointer', fontSize: '12px' }}
                >
                  ❌
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