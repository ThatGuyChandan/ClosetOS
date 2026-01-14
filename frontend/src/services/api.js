import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getProfile = () => API.get('/auth/profile');

export const getWardrobeItems = () => API.get('/wardrobe');
export const addWardrobeItem = (item) => API.post('/wardrobe', item);
export const deleteWardrobeItem = (id) => API.delete(`/wardrobe/${id}`);

export default API;
