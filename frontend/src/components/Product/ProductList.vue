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
      <button @click="handleSearch" class="search-button">🔎 Buscar</button>

      <button @click="toggleShowFavorites" class="showFavorites-button">
        {{ showFavorites ? "Mostrar todos" : "Apenas favoritos" }}
      </button>
    </div>

    <div v-if="loading" class="loading">Carregando produtos...</div>
    <div v-else-if="error" class="error">
      Erro ao carregar produtos: {{ error }}
    </div>
    <div class="product-list" v-else>
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
    const showFavorites = ref(false);
    const filteredProducts = ref([]);

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
      // Realiza a filtragem dos produtos
      filteredProducts.value = store.state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      // Envia os dados para o Google Task Manager
      sendToGoogleTaskManager(searchQuery.value);

      // Log da pesquisa realizada
      console.log("Pesquisa realizada:", searchQuery.value);
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
      showFavorites,
      displayedProducts,
      loading,
      error,
      toggleShowFavorites,
      handleSearch,
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

.showFavorites-button:hover {
  background-color: #52616b;
  color: white;
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

@media (max-width: 768px) {
  .product-item {
    flex: 0 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .product-item {
    flex: 0 1 100%;
  }
}
</style>
