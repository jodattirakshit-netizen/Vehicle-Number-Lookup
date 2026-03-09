import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vnl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (payload) => api.post('/auth/login', payload)
};

export const vehicleApi = {
  searchByNumber: (number) => api.get(`/vehicles/${number}`),
  getAll: () => api.get('/vehicles'),
  getAnalytics: () => api.get('/vehicles/analytics/summary'),
  add: (payload) => api.post('/vehicles', payload),
  update: (id, payload) => api.put(`/vehicles/${id}`, payload),
  remove: (id) => api.delete(`/vehicles/${id}`)
};

export default api;
