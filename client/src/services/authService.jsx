import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/login`

export const login = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    return {error: e.response.data.error || 'Error al iniciar sesión'};
  }
}