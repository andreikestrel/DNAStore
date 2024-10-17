<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Category</th>
        <th>Count</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.rating.count }}</td>
        <td>
          <button @click="deleteProduct(product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ProductTable",
  setup() {
    const store = useStore();

    const products = computed(() => store.state.products);

    const deleteProduct = (id) => {
      store.dispatch("deleteProduct", id);
    };

    return {
      products,
      deleteProduct,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
