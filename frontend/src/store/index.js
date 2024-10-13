/* eslint-disable no-empty-pattern */
import { createStore } from "vuex";
import * as productService from "../services/productService";

export default createStore({
  state() {
    return {
      products: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      error: null,
      loading: false,
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    toggleFavorite(state, product) {
      const index = state.favorites.indexOf(product.id);
      if (index > -1) {
        state.favorites.splice(index, 1);
        this.dispatch("logUnfavoriteProduct", product);
      } else {
        state.favorites.push(product.id);
        this.dispatch("logFavoriteProduct", product);
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
    logFavoriteProduct({}, product) {
      console.log(`Product favorited: ${product.name} (ID: ${product.id})`);
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "favorite_product",
          product_id: product.id,
          product_name: product.name,
          product_category: product.category,
          product_price: product.price,
        });
      }
    },
    logUnfavoriteProduct({}, product) {
      console.log(`Product unfavorited: ${product.name} (ID: ${product.id})`);
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "unfavorite_product",
          product_id: product.id,
          product_name: product.name,
          product_category: product.category,
          product_price: product.price,
        });
      }
    },
    productClicked({ state }, productId) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "product_click",
          product_id: productId,
          product_name:
            state.products.find((p) => p.id === productId)?.title || "",
        });
      }
    },
    productSearched({}, searchQuery) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "product_search",
          search_term: searchQuery,
        });
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
