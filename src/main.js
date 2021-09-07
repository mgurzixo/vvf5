import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index"; // <---

import "@/styles/styles.scss";

createApp(App).use(router).mount("#app");
