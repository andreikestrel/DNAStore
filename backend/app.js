const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api', productRoutes);

module.exports = app;
