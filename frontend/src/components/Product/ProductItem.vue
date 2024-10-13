<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    // eslint-disable-next-line vue/no-deprecated-filter
    <p>{{ product.price | currency }}</p>
    <FavoriteButton :product="product" />
  </div>
</template>

<script>
import FavoriteButton from "./FavoriteButton.vue";

export default {
  props: ["product"],
  components: {
    FavoriteButton,
  },
};
</script>

<style scoped>
.product-item {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}
</style>
