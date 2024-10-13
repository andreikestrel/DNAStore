<template>
  <div class="product-list-container">
    <div class="product-box-input-button">
      <h1 class="title"><span>DNA</span> <span>STORE</span></h1>
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        class="search-input"
        placeholder="Buscar produtos"
      />
      <button @click="handleSearch" class="search-button">🔎 Pesquisar</button>

      <button @click="toggleShowFavorites" class="showFavorites-button">
        {{ showFavorites ? "Mostrar todos" : " ★ Apenas favoritos" }}
      </button>
    </div>

    <div v-if="isSearchActive" class="search-results">
      <template v-if="filteredProducts.length > 0">
        {{ filteredProducts.length }} resultado{{
          filteredProducts.length !== 1 ? "s" : ""
        }}
        encontrado{{ filteredProducts.length !== 1 ? "s" : "" }} para "{{
          lastSearchQuery
        }}"
      </template>
      <template v-else>
        Nenhum produto encontrado para "{{ lastSearchQuery }}"
      </template>
      <a href="#" @click.prevent="clearSearch" class="clear-search"
        >Limpar busca</a
      >
    </div>

    <div v-if="loading" class="loading">Carregando produtos...</div>
    <div v-else-if="error" class="error">
      Erro ao carregar produtos: {{ error }}
    </div>
    <div class="product-list" v-else-if="filteredProducts.length > 0">
      <div
        v-for="product in displayedProducts"
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
          <div>
            <span class="product-price">R${{ product.price }}</span>
          </div>
          <FavoriteButton :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import FavoriteButton from "./FavoriteButton.vue";

export default {
  components: {
    FavoriteButton,
  },
  setup() {
    const store = useStore();
    const searchQuery = ref("");
    const lastSearchQuery = ref(""); // variavel para armazenar a última busca realizada
    const showFavorites = ref(false);
    const filteredProducts = ref([]);
    const isSearchActive = ref(false);

    const displayedProducts = computed(() => {
      if (showFavorites.value) {
        return filteredProducts.value.filter((product) =>
          store.getters.isFavorite(product.id)
        );
      }
      return filteredProducts.value;
    });

    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    const toggleShowFavorites = () => {
      showFavorites.value = !showFavorites.value;
    };

    const handleSearch = () => {
      // Armazena o valor atual da busca
      lastSearchQuery.value = searchQuery.value;

      // Realiza a filtragem dos produtos
      filteredProducts.value = store.state.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(lastSearchQuery.value.toLowerCase())
      );

      // Ativa o estado de busca
      isSearchActive.value = true;

      // Envia os dados para o Google Task Manager
      sendToGoogleTaskManager(lastSearchQuery.value);

      // Log da pesquisa realizada
      console.log("Pesquisa realizada:", lastSearchQuery.value);
    };

    const clearSearch = () => {
      searchQuery.value = "";
      lastSearchQuery.value = "";
      filteredProducts.value = store.state.products;
      isSearchActive.value = false;
    };

    // Função placeholder para enviar dados ao Google Task Manager
    const sendToGoogleTaskManager = (query) => {
      // Implemente a lógica para enviar os dados ao Google Task Manager aqui
      console.log("Enviando para o Google Task Manager:", query);
    };

    onMounted(() => {
      store.dispatch("fetchProducts").then(() => {
        // Inicializa filteredProducts com todos os produtos
        filteredProducts.value = store.state.products;
      });
    });

    return {
      searchQuery,
      lastSearchQuery,
      showFavorites,
      displayedProducts,
      filteredProducts,
      loading,
      error,
      isSearchActive,
      toggleShowFavorites,
      handleSearch,
      clearSearch,
    };
  },
};
</script>
<style scoped>
.title {
  font-size: 3rem;
  font-family: "Asap Condensed", sans-serif;
  font-weight: 600;
  color: #c62e2e;
  user-select: none;
}
.title span:nth-child(2) {
  color: white;
}

.product-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-box-input-button {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: none;
  font-size: 1rem;
  height: auto;
  width: 60%;
  border-radius: 10px;
}

.search-button,
.showFavorites-button {
  padding: 10px;
  cursor: pointer;
  background-color: #c62e2e;
  color: white;
  border: none;
  min-width: 140px;
  border-radius: 10px;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}
.search-results {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.clear-search {
  margin-left: 10px;
  color: #c62e2e;
  text-decoration: none;
  font-weight: bold;
}

.clear-search:hover {
  text-decoration: underline;
}

.no-results {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: white;
}
.showFavorites-button:hover {
  background-color: #7a1d1d;
  color: #ebeb04;
}

.loading,
.error {
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.product-item {
  flex: 0 1 calc(25% - 20px);
  min-width: 200px;
  max-width: 300px;
}

.product-box {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  transition: transform 0.2s;
  position: relative;
  filter: brightness(70%);
  transition: filter 0.3s ease;
}

.product-box:hover {
  transform: scale(1.001);
  filter: brightness(100%);
}

.product-box-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.product-title,
.product-price {
  text-align: center;
  margin-bottom: 5px;
}

.product-price {
  font-size: 1.5rem;
}

.product-title {
  font-weight: bold;
}

.search-results {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.clear-search {
  margin-left: 10px;
  color: #c62e2e;
  text-decoration: none;
  font-weight: bold;
}

.clear-search:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .product-item {
    flex: 0 1 calc(50% - 20px);
  }
  .product-box-input-button {
    flex-wrap: wrap;
  }
  .search-input {
    width: 100%;
  }
  .search-results {
    flex-wrap: wrap;
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .product-item {
    flex: 0 1 100%;
  }
}
</style>
