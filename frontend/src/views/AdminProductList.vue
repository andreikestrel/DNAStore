<template>
  <div class="admin-product-list">
    <h1>Admin Product List</h1>
    <ProductTable />
  </div>
</template>

<script>
import ProductTable from "@/components/ProductTable.vue";

export default {
  name: "AdminProductList",
  components: {
    ProductTable,
  },
};
</script>

<style scoped>
.admin-product-list {
  padding: 20px;
}
</style>
