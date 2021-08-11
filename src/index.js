import Codemirror from "./codeMirror/index.vue";

export * from "./codeMirror/presetMode/log/utils.ts";
export { Codemirror };
export default {
  Codemirror,
  install: (app, config) => {
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
  },
};
