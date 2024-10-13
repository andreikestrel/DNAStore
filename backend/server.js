const app = require('./app');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em port ${PORT}`);
});
