<template>
  <div class="product-list-container">
    <input
      v-model="searchQuery"
      class="search-input"
      placeholder="Buscar produtos"
    />
    <div v-if="loading" class="loading">Carregando produtos...</div>
    <div v-else-if="error" class="error">
      Erro ao carregar produtos: {{ error }}
    </div>
    <ul class="product-list" v-else>
      <li
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item"
      >
        <div class="product-box">
          <div class="product-box-image">
            <img
              :src="product.image"
              :alt="product.title"
              class="product-image"
            />
          </div>
          <span class="product-title">{{ product.title }}</span>
          <span class="product-price"> R${{ product.price }}</span>
          <button @click="toggleFavorite(product.id)" class="favorite-button">
            {{ isFavorite(product.id) ? "❌ desfavoritar" : "❤️ favoritar" }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const searchQuery = ref("");

    const filteredProducts = computed(() =>
      store.getters.filteredProducts(searchQuery.value)
    );

    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    const isFavorite = (productId) => store.getters.isFavorite(productId);

    const toggleFavorite = (productId) => {
      store.commit("toggleFavorite", productId);
    };

    onMounted(() => {
      store.dispatch("fetchProducts");
    });

    return {
      searchQuery,
      filteredProducts,
      isFavorite,
      toggleFavorite,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.product-list-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: start; /* Centraliza verticalmente */
  min-height: 100vh; /* Ocupa a altura total da tela */
  padding: 20px; /* Espaçamento interno */
}

.search-input {
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  font-size: 2rem;
  height: auto;
}

.loading,
.error {
  margin-bottom: 20px; /* Espaçamento abaixo das mensagens de loading e erro */
}

.product-list {
  list-style-type: none;
  padding: 0;
  display: flex; /* Muda para exibir itens em linha */
  flex-wrap: wrap; /* Permite que os itens quebrem para a linha seguinte, se necessário */
  justify-content: center; /* Centraliza os itens horizontalmente */
}

.product-box {
  background-color: aqua;
  width: 250px;
  min-height: 325px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  margin: 10px; /* Espaçamento entre os itens */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px; /* Bordas levemente arredondadas */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  transition: transform 0.2s;
}

.product-item:hover {
  transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
}
.product-box-image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90px; /* Reduz a largura das imagens */
  height: 90px;
}
.product-image {
  max-width: 100%; /* Limita a largura da imagem ao tamanho do contêiner */
  max-height: 100%; /* Mantém a proporção da imagem */
}

.product-title,
.product-price {
  text-align: center;
  font-size: 1rem; /* Centraliza o texto dos títulos e preços */
}

.favorite-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.favorite-button:hover {
  background-color: #0056b3;
}
</style>
