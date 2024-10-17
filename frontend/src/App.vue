<template>
  <div id="app">
    <nav class="admin-menu">
      <router-link to="/">Loja</router-link> |
      <router-link to="/adm/ProductList">Admin Product List</router-link> |
      <router-link to="/adm/ProductRegistration"
        >Product Registration</router-link
      >
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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

.admin-menu {
  visibility: hidden;
  position: fixed;
  background-color: rgba(44, 62, 80, 0.1);
  padding: 10px;
  border-bottom-left-radius: 10px;
  z-index: 1000;
}
.admin-menu:hover {
  visibility: visible;
}

.admin-menu a {
  color: white;
  text-decoration: none;
  margin: 0 5px;
}

.admin-menu a:hover {
  text-decoration: underline;
}
</style>
