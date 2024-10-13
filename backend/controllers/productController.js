const Product = require('../models/productModel');

// Função para retornar todos os produtos
const getAllProducts = (req, res) => {
  const products = Product.getProducts();
  res.json(products);
};

// Função para retornar o relatório básico
const getReport = (req, res) => {
  const products = Product.getProducts();
  res.json({ totalProducts: products.length });
};

module.exports = {
  getAllProducts,
  getReport
};

