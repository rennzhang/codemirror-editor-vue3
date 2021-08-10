/*
 * Vue-CodeMirror
 * Author: surmon@foxmail.com
 * Github: https://github.com/surmon-china/vue-codemirror
 */

import CodemirrorEditor from "./codeMirror/index.vue";

export * from "./codeMirror/presetMode/log/utils.ts";

export const install = (Vue, config) => {
  if (config) {
    if (config.options) {
      CodemirrorEditor.props.globalOptions.default = () => config.options;
    }
    if (config.events) {
      CodemirrorEditor.props.globalEvents.default = () => config.events;
    }
  }
  Vue.component(CodemirrorEditor.name, CodemirrorEditor);
};

export default CodemirrorEditor;
