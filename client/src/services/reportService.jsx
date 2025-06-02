import axios from "axios"

const API_URL = 'http://localhost:3000/reports'

export const getCostsSales = async (type) => {
  try {
    const response = await axios.post(`${API_URL}/cost-sales`, { type });
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener ventas y costos' };
  }
}

export const getBestSellingProducts = async (limit) => {
  try {
    const response = await axios.post(`${API_URL}/best-selling-products`, { limit });
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener los productos más vendidos' };
  }
}

export const getBestSellingDishes = async (limit) => {
  try {
    const response = await axios.post(`${API_URL}/best-selling-dishes`, { limit });
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener los platos más vendidos' };
  }
}