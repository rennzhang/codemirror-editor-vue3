import _CodeMirror from "codemirror";
import type { App } from "vue";
import type { EditorConfiguration } from "codemirror";
import codemirror from "./src/components/index.vue";
import "./src/style/index.css";

declare interface InstallConfig {
  events: any[];
  options: EditorConfiguration;
}

export * from ".";

const CodeMirror = window.CodeMirror || _CodeMirror;
const install = (app: App, config?: InstallConfig) => {
  if (config) {
    if (config.options) {
      codemirror.props.globalOptions.default = () => config.options;
    }
    if (config.events) {
      codemirror.props.globalEvents.default = () => config.events;
    }
  }
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Codemirror", codemirror);
  return app;
};

export * from "./src/components/presetMode/log/utils";
export { CodeMirror, codemirror, install };
export default { CodeMirror, codemirror, install };
