import axios from 'axios';

const api = axios.create({
  baseURL: 'https://snd-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona token JWT às requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data?.error || 'Erro na requisição');
  }
);

export default api;