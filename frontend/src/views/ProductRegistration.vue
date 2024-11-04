<template>
  <div class="product-registration">
    <h1>Product Registration</h1>
    <ProductForm />
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "ProductRegistration",
  components: {
    ProductForm,
  },
};
</script>

<style scoped>
.product-registration {
  padding: 20px;
}
</style>
