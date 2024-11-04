<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Title:</label>
      <input id="title" v-model="product.title" required />
    </div>
    <div>
      <label for="price">Price:</label>
      <input
        id="price"
        v-model.number="product.price"
        type="number"
        step="0.01"
        required
      />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea
        id="description"
        v-model="product.description"
        required
      ></textarea>
    </div>
    <div>
      <label for="category">Category:</label>
      <input id="category" v-model="product.category" required />
    </div>
    <div>
      <label for="image">Image URL:</label>
      <input id="image" v-model="product.image" type="url" required />
    </div>
    <div>
      <label for="rate">Rating:</label>
      <input
        id="rate"
        v-model.number="product.rating.rate"
        type="number"
        step="0.1"
        min="0"
        max="5"
        required
      />
    </div>
    <div>
      <label for="count">Count:</label>
      <input
        id="count"
        v-model.number="product.rating.count"
        type="number"
        min="0"
        required
      />
    </div>
    <button type="submit">Register Product</button>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";

export default {
  name: "ProductForm",
  setup() {
    const store = useStore();
    const product = reactive({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    });

    const submitForm = () => {
      store.dispatch("createProduct", product);
      // Reset form after submission
      Object.assign(product, {
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    };

    return {
      product,
      submitForm,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
