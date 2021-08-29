import Codemirror from "../packages/codeMirror/index.vue";

export * from "../packages/codeMirror/presetMode/log/utils.ts";
import "./codeMirror/index.less";
export { Codemirror };
Codemirror.install = (app, config) => {
  if (config) {
    if (config.options) {
      Codemirror.props.globalOptions.default = () => config.options;
    }
    if (config.events) {
      Codemirror.props.globalEvents.default = () => config.events;
    }
  }
  app.component("Codemirror", Codemirror);
  return app;
};
export default Codemirror;
