<template>
  <div>
    <h1>Lista de Produtos</h1>
    <input v-model="searchQuery" placeholder="Buscar produtos" />
    <div v-if="loading">Carregando produtos...</div>
    <div v-else-if="error">Erro ao carregar produtos: {{ error }}</div>
    <ul v-else>
      <li v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" :alt="product.title" width="100" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }}</p>
        <button @click="toggleFavorite(product.id)">
          {{ isFavorite(product.id) ? "Desfavoritar" : "Favoritar" }}
        </button>
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
/* Estilos simples para o layout */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  border: 1px solid #ddd;
  padding: 10px;
}
img {
  margin-bottom: 10px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
