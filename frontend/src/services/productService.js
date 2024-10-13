import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api"; // Ajuste a URL conforme necessário

// Função para buscar todos os produtos
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

// Função para buscar o relatório de produtos
export const fetchProductReport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/report`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o relatório:", error);
    throw error;
  }
};
