<template>
  <div class="product-list-container">
    <div class="product-box-header">
      <h1 class="title">
        <link rel="stylesheet" href="/" />
        <span>DNA</span> <span>STORE</span>
      </h1>

      <input
        v-model.trim="searchQuery"
        @keyup.enter="handleSearch"
        class="search-input"
        placeholder="Buscar produtos"
      />
      <button @click="handleSearch" class="search-button">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> Pesquisar
      </button>
      <div class="favorites-box-button">
        <button @click="toggleShowFavorites" class="showFavorites-button">
          <font-awesome-icon
            :icon="showFavorites ? ['fas', 'reply-all'] : ['fas', 'star']"
          />
          <span>{{
            showFavorites ? "Mostrar todos" : "Apenas favoritos"
          }}</span>
        </button>
      </div>
      <div>
        <font-awesome-icon class="navBar-icon" :icon="['fas', 'bars']" />
        <nav class="navBar">
          <router-link to="/adm/ProductList">Admin Product List</router-link> |
          <router-link to="/adm/ProductRegistration"
            >Product Registration</router-link
          >
        </nav>
      </div>
    </div>
    <div class="margin-helper"></div>
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
    <div v-else-if="displayedProducts.length === 0" class="no-products">
      Nenhum produto encontrado.
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
              @error="handleImageError"
            />
          </div>
          <span class="product-title">{{ product.title }}</span>
          <div>
            <span class="product-price"
              >R${{ formatPrice(product.price) }}</span
            >
          </div>
          <div class="product-buy">
            <button class="product-buy-btn">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
              Comprar
            </button>
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
  name: "ProductList",
  components: {
    FavoriteButton,
  },
  setup() {
    const store = useStore();
    const searchQuery = ref("");
    const lastSearchQuery = ref("");
    const showFavorites = ref(false);
    const filteredProducts = ref([]);
    const isSearchActive = ref(false);
    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    onMounted(async () => {
      try {
        console.log("ProductList mounted - Fetching products...");
        await store.dispatch("fetchProducts");
        filteredProducts.value = store.state.products;
        console.log("Products fetched successfully:", store.state.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    });

    const displayedProducts = computed(() => {
      if (showFavorites.value) {
        return filteredProducts.value.filter((product) =>
          store.getters.isFavorite(product.id)
        );
      }
      return filteredProducts.value;
    });

    const handleSearch = () => {
      if (searchQuery.value.trim() === "") {
        clearSearch();
        return;
      }

      lastSearchQuery.value = searchQuery.value;
      filteredProducts.value = store.state.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(lastSearchQuery.value.toLowerCase())
      );
      isSearchActive.value = true;

      store.dispatch("productSearched", {
        searchQuery: lastSearchQuery.value,
        resultCount: filteredProducts.value.length,
      });
    };

    const toggleShowFavorites = () => {
      showFavorites.value = !showFavorites.value;
    };

    const clearSearch = () => {
      searchQuery.value = "";
      lastSearchQuery.value = "";
      filteredProducts.value = store.state.products;
      isSearchActive.value = false;
    };

    const formatPrice = (price) => {
      return price.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const handleImageError = (e) => {
      e.target.src = "/placeholder-image.png"; // Substitua pelo caminho da sua imagem de placeholder
    };

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
      formatPrice,
      handleImageError,
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
  text-wrap: nowrap;
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

.product-box-header {
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 100%;
  z-index: 1000;
}

.search-input {
  padding: 10px;
  border: none;
  font-size: 1rem;
  height: auto;
  width: 60%;
  border-radius: 10px;
}
.favorites-box-button {
  width: 180px;
}
.showFavorites-button {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  font-weight: 600;
}
.search-button,
.showFavorites-button span {
  font-weight: 600;
  text-wrap: nowrap;
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
.navBar-icon {
  color: white;
  cursor: pointer; /* Muda o cursor ao passar o mouse */
}

.navBar {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0; /* Inicialmente invisível */
  transition: opacity 0.3s ease; /* Transição suave */
  pointer-events: none; /* Impede interações quando invisível */
}

.navBar-icon:hover + .navBar {
  opacity: 1; /* Torna visível ao passar o mouse */
  pointer-events: auto; /* Permite interações quando visível */
}

.margin-helper {
  margin-bottom: 80px;
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
  transition: transform 0.2s, filter 0.3s ease;
  position: relative;
  filter: brightness(70%);
  cursor: pointer;
}

.product-box:hover {
  transform: scale(1.001);
  filter: brightness(100%);
}

.product-box .favorite-button {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.product-box:hover .favorite-button {
  opacity: 1;
  visibility: visible;
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

.product-buy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.product-buy-btn {
  background-color: #c62e2e;
  color: white;
  font-size: 2rem;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.product-buy-btn:hover {
  background-color: #a62828;
  transform: translateY(-2px);
}

.product-buy-btn:active {
  transform: translateY(0);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
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
