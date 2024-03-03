import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// const app = createApp(App);

// app.use(router);

// app.mount("#app");

let app1;

onAuthStateChanged(auth, () => {
  if (!app1) {
    const app = createApp(App);

    app.use(router);

    app1 = app.mount("#app");
  }
});
