<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.name" />
    <h3 :style="{ fontFamily: fonts.lexend[400] }">{{ product.name }}</h3>
    <p>{{ product.price | currency }}</p>
    <FavoriteButton :product="product" />
  </div>
</template>

<script>
import FavoriteButton from "./FavoriteButton.vue";
import { useFonts } from "../../composables/useFonts";
import { useColors } from "../../composables/useColors"; // Import useColors

export default {
  props: ["product"],
  components: {
    FavoriteButton,
  },
  setup() {
    const { fonts } = useFonts();
    const { colors } = useColors(); // Correção: useColors foi importado e está sendo utilizado

    return { fonts, colors };
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
