import { createApp } from "vue";
import App from "./App.vue";
import { createGtm } from "@gtm-support/vue-gtm";
import store from "./store";

const app = createApp(App);

app.use(store);

app.use(
  createGtm({
    id: "GTM-KWQMXRQ9", // Seu ID do GTM
    enabled: true,
    debug: true,
    loadScript: true,
  })
);

app.config.errorHandler = (err, vm, info) => {
  console.error("Erro global capturado:", err);
  console.error("Informações do erro:", info);
};

app.mount("#app");
