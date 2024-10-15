<template>
  <button
    @click.stop="toggleFavorite"
    class="favorite-button"
    :class="{ 'is-favorited': isFavorited }"
  >
    <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
    <span class="text">{{ isFavorited ? "Desfavoritar" : "Favoritar" }}</span>
  </button>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["product"],
  setup(props) {
    const store = useStore();

    const isFavorited = computed(() =>
      store.getters.isFavorite(props.product.id)
    );

    const toggleFavorite = () => {
      store.commit("toggleFavorite", {
        id: props.product.id,
        name: props.product.title,
        category: props.product.category,
        price: props.product.price,
      });
    };

    return {
      isFavorited,
      toggleFavorite,
    };
  },
};
</script>

<style scoped>
.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  font-size: 0.8rem;
  z-index: 1;
  color: #c62e2e;
}

.favorite-button:hover {
  width: auto;
  border-radius: 15px;
  padding: 0 10px;
}

.favorite-button .icon {
  font-size: 1rem;
}

.favorite-button .text {
  display: none;
  margin-left: 5px;
  white-space: nowrap;
}

.favorite-button:hover .text {
  display: inline;
}

.favorite-button.is-favorited {
  display: flex;
}
</style>
