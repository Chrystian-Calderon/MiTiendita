import axios from "axios"

const API_URL = 'http://localhost:3000/sales'

export const getSales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener las ventas' };
  }
}

export const createSale = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al crear la venta' };
  }
}

export const updateSale = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al actualizar la venta' };
  }
}

export const deleteSale = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al eliminar la venta' };
  }
}