import _CodeMirror from "codemirror";
import type { App } from "vue";
import type { EditorConfiguration } from "codemirror";
import VueCodemirror from "./src/components/index.vue";
import "./src/style/index.css";

declare interface InstallConfig {
  options: EditorConfiguration;
  componentName: string;
}

const install = (app: App, config?: InstallConfig) => {
  if (config) {
    if (config.options) {
      VueCodemirror.props.globalOptions.default = () => config.options;
    }
  }

  app.component(config?.componentName || "Codemirror", VueCodemirror);
  return app;
};

const CodeMirror = window.CodeMirror || _CodeMirror;

/**
 * Use global components.
 * @example
 * import { createApp } from "vue";
 * const app = createApp(App);
 * app.use(GlobalCmComponent, { componentName: "customCodemirrorComponentName" });
 */
const GlobalCmComponent = install;

export * from "./src/components/presetMode/log/utils";

export { CodeMirror, GlobalCmComponent, VueCodemirror };
export default VueCodemirror;
