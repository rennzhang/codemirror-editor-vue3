import DefaultTheme from "vitepress/theme";
import demoPreview from "../../components/demoPreview.vue";
import "vite-plugin-vuedoc/style.css";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("demoPreview", demoPreview);
  },
};
