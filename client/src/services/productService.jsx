import axios from "axios"

const API_URL = 'http://localhost:3000/products'

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener los productos' };
  }
}

export const createProduct = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al crear el producto' };
  }
}

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al actualizar el producto' };
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al eliminar el producto' };
  }
}