import type { App } from "vue";
import type { EditorConfiguration, Editor } from "codemirror";
import VueCodemirror from "./src/components/index.vue";
import "./src/style/index.css";
import _CodeMirror from "./src/sourceLib";

interface CmComp {
  cminstance: Editor;
  resize: (width?: string | number | null, height?: string | number | null) => void;
  refresh: () => void;
  destroy: () => void;
}
export type CmComponentRef = CmComp | null;
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
 * app.use(InstallCodeMirror, { componentName: "customCodemirrorComponentName" });
 */
const GlobalCmComponent = install;
const InstallCodeMirror = install;

export * from "./src/components/presetMode/log/utils";

export { CodeMirror, GlobalCmComponent, InstallCodeMirror, VueCodemirror };
export default VueCodemirror;
