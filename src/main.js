import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
const app = createApp(App);

app.use(router);
app.use(VueToast, {
  position: "top-right",
  duration: 3000,
});

app.mount("#app");
