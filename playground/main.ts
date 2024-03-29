import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
// import Codemirror from "@/index";
import "virtual:uno.css";

const app = createApp(App);
// app.use(VueCodemirror, { componentName: "vuezCodemirror" });
app.use(router);
app.mount("#app");
