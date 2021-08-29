import theme from "vitepress/dist/client/theme-default";
import "./styles/index.css";
import demoPreview from "../../components/demoPreview.vue";
export default {
  ...theme,
  enhanceApp({ app }) {
    app.component("demoPreview", demoPreview);
  },
};
