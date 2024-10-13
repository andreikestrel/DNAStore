import Vuex from "vuex";
const { createStore } = Vuex;
import * as productService from "../services/productService";

export default createStore({
  state: {
    products: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    error: null,
    loading: false,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const products = await productService.fetchProducts();
        commit("setProducts", products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        commit("setError", error.message || "Erro ao buscar produtos");
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    filteredProducts: (state) => (searchQuery) => {
      if (!searchQuery) return state.products;
      return state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    isFavorite: (state) => (productId) => {
      return state.favorites.includes(productId);
    },
  },
});
