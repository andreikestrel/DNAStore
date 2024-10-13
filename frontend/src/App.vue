<template>
  <div id="app">
    <ProductList />
  </div>
</template>

<script>
import ProductList from "./components/Product/ProductList.vue";

export default {
  name: "App",
  components: {
    ProductList,
  },
};
</script>

<style>
/* Estilos globais para sua aplicação */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
