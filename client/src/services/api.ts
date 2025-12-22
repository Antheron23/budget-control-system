import axios from 'axios';

// Create a single axios instance for the whole app
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Matches your Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Automatically add the Token to every request
// (So you don't have to write headers manually ever again)
// ... imports and api creation stay the same ...

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // 1. Send as Standard Bearer Token
      config.headers.Authorization = `Bearer ${token}`;
      
      // 2. ALSO send as "x-auth-token" (Common in MERN tutorials)
      config.headers['x-auth-token'] = token;
      
      console.log("🚀 Attaching Token to request:", token.substring(0, 10) + "...");
    } else {
      console.log("⚠️ No token found in Local Storage");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;