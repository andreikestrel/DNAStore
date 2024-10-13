const products = require('../data/products.json');

const getProducts = () => {
  return products;
};

module.exports = {
  getProducts
};
