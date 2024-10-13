<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <input
    type="text"
    :value="modelValue"
    placeholder="Buscar produtos..."
    @input="handleSearch"
  />
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    handleSearch(event) {
      window.dataLayer.push({
        event: "search",
        searchQuery: event.target.value,
      });
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 20px;
}
</style>
