import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/Product/ProductList.vue";
import AdminProductList from "@/views/AdminProductList.vue";
import ProductRegistration from "@/views/ProductRegistration.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ProductList,
  },
  {
    path: "/adm/ProductList",
    name: "AdminProductList",
    component: AdminProductList,
  },
  {
    path: "/adm/ProductRegistration",
    name: "ProductRegistration",
    component: ProductRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
