<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>
<script lang="ts">
import _CodeMirror from "codemirror";

import { ref, watch, onMounted, markRaw, defineComponent } from "vue";
import { getLinkMark, getLogMark } from "./utils";
import "./languages/fcLog/index";
import "./languages/simpleLog/index";

declare const window: any;
const CodeMirror = window.CodeMirror || _CodeMirror;

// import 'codemirror/addon/lint/lint.css'
export default defineComponent({
  name: "codemirror-fclog",
  props: {
    code: String,
    value: String,
    content: String,
    name: {
      type: String,
      default: `cm-textarea-${new Date().toString()}`,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    cminstance: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const textarea = ref();
    const _cminstance = ref(null);

    const renderTextMark = (cminstance = props.cminstance) => {
      const marks = cminstance.getAllMarks();
      // 重置marks
      marks.forEach((mark) => mark.clear());
      const value = cminstance.getValue();
      const linkMarks = [].concat(getLinkMark(value)).concat(getLogMark(value));
      for (let _i = 0; _i < linkMarks.length; _i++) {
        const mark = linkMarks[_i];
        cminstance.markText(
          cminstance.posFromIndex(mark.start),
          cminstance.posFromIndex(mark.end),
          { replacedWith: mark.node }
        );
      }
    };

    const initialize = () => {
      _cminstance.value = markRaw(
        CodeMirror.fromTextArea(textarea.value, props.options)
      );

      emit("update:cminstance", markRaw(_cminstance.value));

      _cminstance.value.on("change", renderTextMark);
    };

    watch(
      () => props.cminstance,
      (val) => {
        if (val) {
          renderTextMark(props.cminstance);
          props.cminstance.setValue(props.code || props.value || props.content);
          emit("ready", _cminstance);
        }
      },
      { deep: true, immediate: true }
    );

    onMounted(() => {
      initialize();
    });
    return {
      initialize,
      textarea,
    };
  },
});
</script>
