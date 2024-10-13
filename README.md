# Desafio DNA
---

### Descrição
Este projeto é uma resposta ao desafio que envolve a criação de uma aplicação web simples com funcionalidades de listagem de produtos e integração com o Google Tag Manager.

**Funcionalidades Principais:**

- **Página de Listagem de Produtos:** A aplicação apresenta uma página em Vue.js que exibe uma lista de produtos fictícios, cujos dados são armazenados em um arquivo JSON obtido do Fake Store API. Os produtos são exibidos dinamicamente, mostrando informações como nome, preço e imagem.

- **Campo de Busca:** A aplicação inclui um campo de busca que permite filtrar os produtos por nome, facilitando a localização dos itens desejados. A funcionalidade de busca é implementada no componente `ProductList.vue` e utiliza o Vuex store para gerenciar o estado da busca.

- **Favoritar Produtos:** Os usuários podem marcar produtos como favoritos clicando no ícone de coração em cada item. Esta funcionalidade é implementada no componente `FavoriteButton.vue` e utiliza o LocalStorage para persistir os favoritos entre sessões.

- **Filtrar Favoritos:** Um botão "Apenas favoritos" permite aos usuários visualizar apenas os produtos que foram marcados como favoritos.

- **Integração com Google Tag Manager (GTM):** A aplicação utiliza o GTM para rastrear eventos importantes, como buscas de produtos, cliques em produtos e ações de favoritar/desfavoritar.

**Backend:**

O backend é construído com Node.js e fornece um servidor básico que disponibiliza os dados dos produtos através de três endpoints principais:

1. **`/api/products`:** Este endpoint retorna a lista completa de produtos em formato JSON. Os dados são lidos diretamente do arquivo JSON, permitindo que o frontend exiba as informações de maneira dinâmica.

2. **`/api/products/report`:** Este endpoint fornece um relatório básico que inclui a contagem de itens da api e a quantidade por categoria.

## **Integração com Google Tag Manager:**

A aplicação implementa o rastreamento de eventos detalhados usando o Google Tag Manager:

1. **Inicialização do GTM:** O GTM é inicializado no arquivo `index.html` e configurado no `main.js` usando a biblioteca `@gtm-support/vue-gtm`.

2. **Rastreamento de Cliques em Produtos:** Quando um usuário clica em um produto, um evento `product_click` é enviado ao GTM com o ID e nome do produto.

4. **Rastreamento de Buscas:** Cada busca realizada pelo usuário dispara um evento `product_search` com o termo de pesquisa.

5. **Rastreamento de Favoritos:** As ações de favoritar (`favorite_product`) e desfavoritar (`unfavorite_product`) produtos são rastreadas, incluindo detalhes como ID, nome, categoria e preço do produto.
   ![image](https://github.com/user-attachments/assets/5a9e7fd7-c746-4a3b-b03b-a51ece631acf)


7. **Camada de Dados:** A aplicação utiliza a camada de dados do GTM (`dataLayer`) para enviar informações detalhadas sobre cada evento, permitindo uma análise mais aprofundada do comportamento do usuário.

**Funcionalidade de Favoritos:**

- O botão de favoritar/desfavoritar é um componente separado (`FavoriteButton.vue`) que pode ser reutilizado em diferentes partes da aplicação.
- O estado dos favoritos é gerenciado no Vuex store e persistido no LocalStorage.
- A lista de favoritos pode ser filtrada usando o botão "Apenas favoritos" no componente `ProductList.vue`.

**Funcionalidade de Pesquisa:**

- A pesquisa é realizada em tempo real à medida que o usuário digita no campo de busca.
- Os resultados da pesquisa são exibidos dinamicamente, filtrando a lista de produtos com base no texto inserido.
- A lógica de filtragem está implementada no Vuex store, permitindo uma fácil extensão para pesquisas mais complexas no futuro.

**Diferenciais:**

- A aplicação utiliza uma estrutura de componentes modular, facilitando a manutenção e extensão do código.
- O design responsivo garante uma boa experiência do usuário em diferentes dispositivos.
- A integração com o GTM permite uma análise detalhada do comportamento do usuário, fornecendo insights valiosos para melhorias futuras.

### Estrutura do projeto

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
    ├── .env
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

   O frontend será iniciado na porta **8080**. Ele exibirá a lista de produtos dinamicamente e permitirá que você salve produtos favoritos no LocalStorage.

### Resumo das Portas

- **Backend**: `http://localhost:3001` 
Não esquecer das rotas `/api/products` ou `/api/products/report`

- **Frontend**: `http://localhost:8080`

Com esses passos, você estará pronto para utilizar a aplicação e explorar as funcionalidades!

### Nota sobre o arquivo .env

Por se tratar de um projeto de teste e não conter dados sensíveis reais, o arquivo `.env` foi incluído no repositório para facilitar a configuração e execução do projeto. Em um ambiente de produção, recomenda-se adicionar o `.env` ao `.gitignore` para proteger informações sensíveis.

Este projeto demonstra não apenas a aplicação das tecnologias requisitadas, mas também uma abordagem prática e eficiente para resolver o desafio proposto, incluindo uma robusta integração com o Google Tag Manager para análise detalhada do comportamento do usuário.
