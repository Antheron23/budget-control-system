import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post('/api/auth/register', JSON.stringify({ name, email, password }), config);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err.response.data);
      alert('Error registering user');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Start tracking your expenses today</p>
        
        <form onSubmit={onSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password (6+ chars)"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
          <input 
            className="auth-btn" 
            type="submit" 
            value="Register" 
          />
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;