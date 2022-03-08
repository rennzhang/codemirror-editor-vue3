<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watch, onMounted, markRaw } from "vue";
import type { PropType } from "vue";
import type { Editor } from "codemirror";

import _CodeMirror from "codemirror";
import { getLinkMarks, getLogMark, MarkStates } from "./utils";
import "./languages/fcLog/index";
import "./languages/simpleLog/index";

const CodeMirror = window.CodeMirror || _CodeMirror;

// import 'codemirror/addon/lint/lint.css'
export default defineComponent({
  name: "CodemirrorFclog",
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
    name: {
      type: String as PropType<string>,
      default: `cm-textarea-${+new Date()}`,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    cminstance: {
      type: Object as PropType<Nullable<Editor>>,
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
    const _cminstance = ref<Nullable<Editor>>(null);

    const renderTextMark = (
      cminstance: Editor = props.cminstance as Editor
    ) => {
      const marks = cminstance.getAllMarks();
      // 重置marks
      marks.forEach((mark) => mark.clear());
      const value = cminstance.getValue();
      const linkMarks: MarkStates[] = ([] as MarkStates[])
        .concat(getLinkMarks(value))
        .concat(getLogMark(value));
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

      emit("update:cminstance", unref(_cminstance));

      _cminstance.value?.on("change", renderTextMark);
    };

    watch(
      () => props.cminstance,
      (val) => {
        if (val) {
          renderTextMark(props.cminstance as Editor);
          props.cminstance?.setValue(props.value);
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

<style scoped lang="less"></style>
