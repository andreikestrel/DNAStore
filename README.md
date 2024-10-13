# Desafio DNA
---

### Descrição
Este projeto é uma resposta ao desafio que envolve a criação de uma aplicação web simples com funcionalidades de listagem de produtos e integração com o Google Tag Manager.

**Funcionalidades Principais:**

- **Página de Listagem de Produtos:** A aplicação apresenta uma página em Vue.js que exibe uma lista de produtos fictícios, cujos dados são armazenados em um arquivo JSON obtido do Fake Store API. Os produtos são exibidos dinamicamente, mostrando informações como nome, preço e imagem.

- **Campo de Busca:** A aplicação inclui um campo de busca que permite filtrar os produtos por nome, facilitando a localização dos itens desejados.

**Backend:**

O backend é construído com Node.js e fornece um servidor básico que disponibiliza os dados dos produtos através de três endpoints principais:

1. **`/api/products`:** Este endpoint retorna a lista completa de produtos em formato JSON. Os dados são lidos diretamente do arquivo JSON, permitindo que o frontend exiba as informações de maneira dinâmica.

3. **`/api/products/report`:** Este endpoint fornece um relatório básico que inclui a contagem de itens da api e a quantidade por categoria.

**Integração com Google Tag Manager:**

A aplicação implementa o rastreamento de eventos básicos, incluindo cliques em produtos para visualizar mais detalhes e buscas no campo de pesquisa. Esses eventos são enviados para o Google Tag Manager, permitindo uma análise detalhada do comportamento dos usuários.

##### Estrutura do projeto

```
desafioDNA/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── yarn.lock
└── frontend/
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── views/
    │   ├── router/
    │   │   └── index.js
    │   ├── store/
    │   │   └── index.js
    │   ├── App.vue
    │   ├── main.js
    ├── .babelrc
    ├── babel.config.js
    ├── jsconfig.json
    ├── package.json
    ├── vue.config.js
    └── yarn.lock

```
## Como executar esse projeto

### 1. Executando o Backend

1. **Abra o terminal para o Backend**:
   Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. **Instale as dependências**:
   Execute o seguinte comando para instalar as dependências do projeto:
   ```bash
   yarn install
   ```

3. **Inicie o servidor**:
   Depois de instalar as dependências, inicie o servidor:
   ```bash
   yarn start
   ```

   O backend será iniciado na porta **3001**. Ele fornece os dados dos produtos e a rota para o relatório de produtos.

### 2. Executando o Frontend

1. **Abra o terminal para o Frontend**:
   Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. **Instale as dependências**:
   Execute o seguinte comando para instalar as dependências do projeto:
   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**:
   Depois de instalar as dependências, inicie o servidor de desenvolvimento:
   ```bash
   yarn serve
   ```

   O frontend será iniciado na porta **8080**. Ele exibirá a lista de produtos dinâmicamente e permitirá que você salve produtos favoritos no LocalStorage.

### Resumo das Portas

- **Backend**: `http://localhost:3001` 
Não esquecer das rotas `/api/products` ou `/api/products/report`

- **Frontend**: `http://localhost:8080`

Com esses passos, você estará pronto para utilizar a aplicação e explorar as funcionalidades!



**Diferenciais:**

A aplicação também conta com a funcionalidade de "favoritar" produtos, armazenando essa informação no LocalStorage, o que proporciona uma experiência mais personalizada para os usuários. Para aprimorar a usabilidade, foi aplicado um CSS básico que estiliza a página, tornando-a mais visualmente agradável.

Este projeto demonstra não apenas a aplicação das tecnologias requisitadas, mas também uma abordagem prática e eficiente para resolver o desafio proposto.

```

Sinta-se à vontade para editar ou expandir conforme necessário!