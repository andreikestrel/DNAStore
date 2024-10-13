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
* {
  font-family: "Lexend", sans-serif;
  font-weight: 300; /* Define o peso 300 como padrão */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-color: rgb(58, 58, 58); /* Substitua pela cor desejada */
  min-height: 100vh; /* Para cobrir toda a tela */
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
