import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Относительный путь, чтобы MSW перехватывал запросы
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
