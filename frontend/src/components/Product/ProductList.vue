<template>
  <div class="product-list-container">
    <div class="product-box-input-button">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        class="search-input"
        placeholder="Buscar produtos"
      />
      <button @click="toggleShowFavorites" class="showFavorites-button">
        {{ showFavorites ? "Mostrar todos" : "Mostrar favoritos" }}
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
          <span class="product-price">R${{ product.price }}</span>
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

    const filteredProducts = computed(() =>
      store.getters.filteredProducts(searchQuery.value)
    );

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
      store.dispatch("productSearched", searchQuery.value);
    };

    onMounted(() => {
      store.dispatch("fetchProducts");
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

.showFavorites-button {
  padding: 10px;
  cursor: pointer;
  background-color: #c62e2e;
  color: white;
  border: none;
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
}

.product-box:hover {
  transform: scale(1.05);
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
  font-size: 1rem;
  margin-bottom: 5px;
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
