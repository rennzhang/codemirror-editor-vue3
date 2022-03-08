import _CodeMirror from "codemirror";
import type { App } from "vue";
import type { EditorConfiguration } from "codemirror";
import codemirror from "./src/components/index.vue";
import "./src/style/index.css";

declare interface InstallConfig {
  events: any[];
  options: EditorConfiguration;
  componentName: string;
}

const CodeMirror = window.CodeMirror || _CodeMirror;
const install = (app: App, config?: InstallConfig) => {
  if (config) {
    if (config.options) {
      codemirror.props.globalOptions.default = () => config.options;
    }
  }

  app.component(config?.componentName || "Codemirror", codemirror);
  return app;
};

export * from ".";

export * from "./src/components/presetMode/log/utils";

export { CodeMirror, codemirror, install as VueCodemirror };

export default codemirror;
