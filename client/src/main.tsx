import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ensure this path is correct
import './index.css';
import { AuthProvider } from './context/AuthContext'; // Import the provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* WRAP THE APP HERE */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);