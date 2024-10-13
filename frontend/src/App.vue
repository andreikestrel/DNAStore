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
* {
  font-family: "Lexend", sans-serif;
  font-weight: 300;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-color: #1e2022;
  min-height: 100vh;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
