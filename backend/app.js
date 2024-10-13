const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://192.168.3.3:8080'] // Array de origens permitidas
}));

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api', productRoutes);

module.exports = app;