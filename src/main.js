import { createApp } from "vue";
import store from "./store";
import myApp from "./App.vue";
import router from "./routes/index";
import VuePageTransition from "vue-page-transition";

import "@/styles/styles.scss";

const app = createApp(myApp);
app.use(store);
app.use(router);
app.use(VuePageTransition);
app.mount("#app");
