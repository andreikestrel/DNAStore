const Product = require('../models/productModel');

// Função para retornar todos os produtos
const getAllProducts = (req, res) => {
  const products = Product.getProducts();
  res.json(products);
};

// Função para retornar o relatório básico
// Função para retornar o relatório básico
const getReport = (req, res) => {
  const products = Product.getProducts();
  const totalProducts = products.length;
  const productsByCategory = {};

  products.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = 1;
    } else {
      productsByCategory[product.category]++;
    }
  });

  res.json({
    totalProducts,
    productsByCategory,
  });
};

module.exports = {
  getAllProducts,
  getReport
};

