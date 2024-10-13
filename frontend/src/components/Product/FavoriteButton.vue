<template>
  <button @click="toggleFavorite">
    {{ isFavorited ? "Desfavoritar" : "Favoritar" }}
  </button>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      isFavorited: false,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (this.isFavorited) {
        favorites.push(this.product.id);
      } else {
        const index = favorites.indexOf(this.product.id);
        if (index > -1) favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
  },
  mounted() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.isFavorited = favorites.includes(this.product.id);
  },
};
</script>

<style scoped>
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
