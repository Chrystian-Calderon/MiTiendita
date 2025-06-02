import axios from "axios"

const API_URL = 'http://localhost:3000/shop'

export const getShopping = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener los datos de la tienda' };
  }
}

export const createShopping = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al crear los datos de la tienda' };
  }
}

export const updateShopping = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al actualizar los datos de la tienda' };
  }
}

export const deleteShopping = async (id, producto_id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      data: { producto_id }});
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al eliminar los datos de la tienda' };
  }
}