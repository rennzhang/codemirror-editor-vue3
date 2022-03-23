import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "virtual:windi.css";
// import Codemirror from "@/index";

const app = createApp(App);
// app.use(VueCodemirror, { componentName: "vuezCodemirror" });
app.use(router);
app.mount("#app");
