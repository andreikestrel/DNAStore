import { createApp } from "vue";
import App from "./App.vue";
import { createGtm } from "@gtm-support/vue-gtm";
import store from "./store";

// Importações do Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHeart as fasHeart,
  faCartShopping,
  faStar,
  faMagnifyingGlass,
  faReplyAll,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

// Adicione os ícones que você planeja usar à biblioteca
library.add(
  fasHeart,
  farHeart,
  faCartShopping,
  faStar,
  faMagnifyingGlass,
  faReplyAll
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store);
app.use(
  createGtm({
    id: "GTM-KWQMXRQ9",
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
