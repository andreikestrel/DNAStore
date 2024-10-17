const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

// Função para listar todos os produtos
const getAllProducts = (req, res) => {
  const products = Product.getProducts();
  res.json(products);
};

// Função para criar um novo produto
const createProduct = (req, res) => {
  const newProduct = req.body;
  
  // Carregar os produtos existentes
  const products = Product.getProducts();
  
  // Definir um novo ID baseado no último produto
  const newId = products.length ? products[products.length - 1].id + 1 : 1;
  newProduct.id = newId;

  // Adicionar o novo produto à lista de produtos
  products.push(newProduct);

  // Atualizar o arquivo products.json
  const filePath = path.join(__dirname, '../data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

  res.status(201).json(newProduct);
};

// Função para gerar o relatório
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
  createProduct,
  getReport
};
