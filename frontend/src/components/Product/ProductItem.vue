<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="product-item" @click="handleClick">
    <div class="product-box">
      <div class="product-box-image">
        <img :src="product.image" :alt="product.title" class="product-image" />
      </div>
      <span class="product-title">{{ product.title }}</span>
      <div>
        <span class="product-price">R${{ product.price }}</span>
      </div>
      <FavoriteButton :product="product" />
    </div>
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
      store.dispatch("productClicked", {
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        category: props.product.category,
      });
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
