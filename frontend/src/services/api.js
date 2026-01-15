import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const register = async (name, email, password) => {
  return axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
};

const login = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
};

const getWardrobeItems = async (token) => {
  return axios.get(`${API_URL}/wardrobe`, {
    headers: {
      'x-auth-token': token,
    },
  });
};

const addWardrobeItem = async (formData, token) => {
  return axios.post(`${API_URL}/wardrobe`, formData, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteWardrobeItem = async (id, token) => {
  return axios.delete(`${API_URL}/wardrobe/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  });
};

const generateOutfit = async (occasion, token) => {
  return axios.post(`${API_URL}/outfits/generate`, { occasion }, {
    headers: {
      'x-auth-token': token,
    },
  });
};

const getProfile = async (token) => {
  return axios.get(`${API_URL}/auth/profile`, {
    headers: {
      'x-auth-token': token,
    },
  });
};

export default {
  register,
  login,
  getWardrobeItems,
  addWardrobeItem,
  deleteWardrobeItem,
  generateOutfit,
  getProfile,
};
