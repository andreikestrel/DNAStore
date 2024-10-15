const Product = require('../models/productModel');


const getAllProducts = (res) => {
  const products = Product.getProducts();
  res.json(products);
};


// Lógica do relatório
const getReport = (res) => {
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

