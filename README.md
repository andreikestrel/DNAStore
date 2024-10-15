# Desafio DNA
---

### Descrição
Este projeto é uma resposta ao desafio que envolve a criação de uma aplicação web simples com funcionalidades de listagem de produtos e integração com o Google Tag Manager.

![image](https://github.com/user-attachments/assets/270c29b5-fe97-4f6a-9a37-622b5cb44e79)


**Funcionalidades Principais:**

- **Página de Listagem de Produtos:** A aplicação apresenta uma página em Vue.js que exibe uma lista de produtos fictícios, cujos dados são armazenados em um arquivo JSON obtido do Fake Store API. Os produtos são exibidos dinamicamente, mostrando informações como nome, preço e imagem.

- **Campo de Busca:** A aplicação inclui um campo de busca que permite filtrar os produtos por nome, facilitando a localização dos itens desejados. A funcionalidade de busca é implementada no componente `ProductList.vue` e utiliza o Vuex store para gerenciar o estado da busca.

- **Favoritar Produtos:** Os usuários podem marcar produtos como favoritos clicando no ícone de coração em cada item. Esta funcionalidade é implementada no componente `FavoriteButton.vue` e utiliza o LocalStorage para persistir os favoritos entre sessões.

- **Filtrar Favoritos:** Um botão "Apenas favoritos" permite aos usuários visualizar apenas os produtos que foram marcados como favoritos.

- **Integração com Google Tag Manager (GTM):** A aplicação utiliza o GTM para rastrear eventos importantes, como buscas de produtos, cliques em produtos e ações de favoritar/desfavoritar.

- **Estilização** A estilização da aplicação foi feita exclusivamente com CSS puro. Para os ícones, foram utilizados emojis em formato Unicode, simplificando a implementação. A página segue uma paleta de cores que inclui o vermelho #c62e2e, preto e branco padrão, e o amarelo #ebeb04 para destacar o texto do botão 'Mostrar Favoritos' quando ativado. O hover desse botão utiliza o tom de vermelho escuro #7a1d1d.

**Backend:**

O backend é construído com Node.js e fornece um servidor básico que disponibiliza os dados dos produtos através de três endpoints principais:

1. **`/api/products`:** Este endpoint retorna a lista completa de produtos em formato JSON. Os dados são lidos diretamente do arquivo JSON, permitindo que o frontend exiba as informações de maneira dinâmica.

2. **`/api/products/report`:** Este endpoint fornece um relatório básico que inclui a contagem de itens da api e a quantidade por categoria.

## **Integração com Google Tag Manager:**

A aplicação implementa o rastreamento de eventos detalhados usando o Google Tag Manager:

1. **Inicialização do GTM:** O GTM é inicializado no arquivo `index.html` e configurado no `main.js` usando a biblioteca `@gtm-support/vue-gtm`.

2. **Rastreamento de Cliques em Produtos:** Quando um usuário clica em um produto, um evento `product_click` é enviado ao GTM com o ID e nome do produto.

4. **Rastreamento de Buscas:** Cada busca realizada pelo usuário dispara um evento `product_search` com o termo de pesquisa e a quantidade de items encontrados.
![image](https://github.com/user-attachments/assets/d7482b44-d3c3-4c62-9399-90cf9fb31b19)   
![image](https://github.com/user-attachments/assets/a87d92b7-69ae-4ba0-a74b-740965967256)




6. **Rastreamento de Favoritos:** As ações de favoritar (`favorite_product`) e desfavoritar (`unfavorite_product`) produtos são rastreadas, incluindo detalhes como ID, nome, categoria e preço do produto.
   ![image](https://github.com/user-attachments/assets/5a9e7fd7-c746-4a3b-b03b-a51ece631acf)


7. **Camada de Dados:** A aplicação utiliza a camada de dados do GTM (`dataLayer`) para enviar informações detalhadas sobre cada evento, permitindo uma análise mais aprofundada do comportamento do usuário.

**Funcionalidade de Favoritos:**

- O botão de favoritar/desfavoritar é um componente separado (`FavoriteButton.vue`) que pode ser reutilizado em diferentes partes da aplicação.
- O estado dos favoritos é gerenciado no Vuex store e persistido no LocalStorage.
- A lista de favoritos pode ser filtrada usando o botão "Apenas favoritos" no componente `ProductList.vue`.

**Funcionalidade de Pesquisa:**

- Por questões de métricas, a pesquisa não é realizada em tempo real, garantindo que sempre capture o termo completo que o usuário está pesquisando.
- Os resultados da filtra lista de produtos com base no texto inserido e os titulos do produtos.
- A lógica de filtragem está implementada no Vuex store, permitindo uma fácil extensão para pesquisas mais complexas no futuro.

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

   
   #### EXEMPLO:
   ![image](https://github.com/user-attachments/assets/c25eeb22-2881-430f-839a-6fa6f07c2614)

   **Na imagem foi pulado o passo 2 pois eu já pussuia as dependencias instaladas**

   

### 2. Executando o Frontend

1. **Abra outra instancia do terminal para o Frontend**:
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

   
  #### EXEMPLO:
   ![image](https://github.com/user-attachments/assets/19711e5a-ba8b-44e4-aa9f-134605f413b0)

   **Na imagem foi pulado o passo 2 pois eu já pussuia as dependencias instaladas**

   

### Resumo das Portas

- **Backend**: `http://localhost:3001` 
Não esquecer das rotas `/api/products` ou `/api/products/report`

- **Frontend**: `http://localhost:8080`

Com esses passos, você estará pronto para utilizar a aplicação e explorar as funcionalidades!

## Observações
---

#### Nota sobre o arquivo .env 

Por se tratar de um projeto de teste e não conter dados sensíveis reais, o arquivo `.env` foi incluído no repositório para facilitar a configuração e execução do projeto. Em um ambiente de produção, recomenda-se adicionar o `.env` ao `.gitignore` para proteger informações sensíveis.

#### Recurso que eu usaria, mas não usei por causa do "usar apenas css puro", fiquei com medo de alguém interpretar isso como algum meio de não ser puro embora os icones sejam estilizados apenas usando css (atualizado após o envio do material)

Enviei os produtos sem alguns recursos para tentar ficar o mais próximo possível do CSS puro. Eu até poderia usar SVG para os ícones, mas isso daria um trabalhão! A ideia de usar apenas CSS é bem legal, mas percebi que, se tivesse incluído alguns ícones do Font Awesome, poderia ter deixado a aparência muito mais bonita e sem complicação. Na verdade, até fiz uma versão 2.0 desse sistema só por diversão, que coloquei na branch de teste, onde utilizei o Font Awesome para adicionar ícones em SVG de forma fácil e prática.
Depois de submeter o teste, decidi atualizar essa parte da documentação para compartilhar minha visão. Em um projeto real, eu teria feito algumas mudanças para deixar tudo melhor. Aceitei o desafio do CSS puro, mas aqui estão algumas coisas que eu teria feito:

- Botão de Compra: Adicionei um botão de compra com um carrinho do Font Awesome e revisei todos os ícones.

![image](https://github.com/user-attachments/assets/9e048438-e5dd-4bb1-a1e8-dcb3e2cb5cda)


- Ícones de Favoritos: Usei um coração preenchido para os favoritos e um coração vazio para os que não são favoritos. Como optei por ícones SVG em vez de emojis, pensei que a experiência do usuário poderia ser mais interessante. O hover do card sumir completamente não parecia tão legal, mas com o ícone de coração do Font Awesome, tudo ficou perfeito.

![image](https://github.com/user-attachments/assets/4214e4a2-f095-4b04-a68c-fcd1f929d1c5)


- Mudanças nos Botões: Também dei uma repaginada nos ícones dos botões de busca e de mostrar favoritos / mostrar todos. Para o botão de mostrar todos, coloquei uma seta que indica voltar ao modo anterior, melhorando a experiência do usuário.

![image](https://github.com/user-attachments/assets/38d39b9b-0c13-4ac7-9bae-aab9701cada1)


Essas mudanças não só deixariam o visual mais bonito, mas também tornariam a navegação mais intuitiva e agradável 😁

Este projeto demonstra não apenas a aplicação das tecnologias requisitadas, mas também uma abordagem prática e eficiente para resolver o desafio proposto, incluindo uma robusta integração com o Google Tag Manager para análise detalhada do comportamento do usuário.
