import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

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

// Função para criar um novo produto
export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

// Função para deletar um produto
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};

// Função para atualizar um produto
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};
