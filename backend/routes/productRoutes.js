const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para listar todos os produtos
router.get('/products', productController.getAllProducts);

// Rota para o relatório de produtos
router.get('/products/report', productController.getReport);

module.exports = router;
