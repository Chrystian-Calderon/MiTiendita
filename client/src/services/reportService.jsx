import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/reports`

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

export const getSalesWithProfit = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales-profit`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener ventas y ganancia' };
  }
}

export const getShopWithIncrement = async () => {
  try {
    const response = await axios.get(`${API_URL}/shop-increment`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener compras y su incremento' };
  }
}

export const getProfitMargin = async () => {
  try {
    const response = await axios.get(`${API_URL}/profit-margin`);
    return response.data;
  } catch (e) {
    return { error: e.response.data.error || 'Error al obtener margen de ganancia' };
  }
}