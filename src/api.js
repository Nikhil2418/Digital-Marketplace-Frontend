import axios from 'axios';

const api = axios.create({
  baseURL: 'https://digital-marketplace-backend-production.up.railway.app/api',
});

export default api;
