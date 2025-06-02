import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/dishes`
export const getDishes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener los platos' };
  }
}

export const createDish = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al crear el plato' };
  }
}

export const updateDish = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al actualizar el plato' };
  }
}

export const deleteDish = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al eliminar el plato' };
  }
}