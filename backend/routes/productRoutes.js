const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Listar todos os produtos
router.get('/products', productController.getAllProducts);

// Rota para o relatorio
router.get('/products/report', productController.getReport);

module.exports = router;
