import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post('/api/auth/login', JSON.stringify({ email, password }), config);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err.response.data);
      alert('Invalid Credentials'); // Simple alert for error
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to manage your budget</p>
        
        <form onSubmit={onSubmit}>
          <input
            className="auth-input"  // <--- Added class
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            className="auth-input" // <--- Added class
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <input 
            className="auth-btn"   // <--- Added class
            type="submit" 
            value="Login" 
          />
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;