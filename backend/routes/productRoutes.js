const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Listar todos os produtos
router.get('/products', productController.getAllProducts);

// Criar um novo produto
router.post('/products', productController.createProduct);

// Rota para o relatório
router.get('/products/report', productController.getReport);

module.exports = router;
