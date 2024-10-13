<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="product-item" @click="handleClick">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.price | currency }}</p>
    <FavoriteButton :product="product" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import FavoriteButton from "./FavoriteButton.vue";

export default {
  props: ["product"],
  components: {
    FavoriteButton,
  },
  setup(props) {
    const store = useStore();

    const handleClick = () => {
      store.dispatch("productClicked", props.product.id);
    };

    return { handleClick };
  },
};
</script>

<style scoped>
.product-item {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.product-item:hover {
  background-color: #f5f5f5;
}
</style>
