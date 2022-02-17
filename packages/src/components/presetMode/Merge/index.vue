<template>
  <div ref="mergeView" />
</template>

<script lang="ts">
import type { Editor, EditorConfiguration } from "codemirror";
import type { PropType } from "vue";

// lib
import _CodeMirror from "codemirror";

import { ref, onMounted, markRaw, defineComponent } from "vue";

// merge css
import "codemirror/addon/merge/merge.css";

// merge js
import "codemirror/addon/merge/merge.js";

// google DiffMatchPatch
import DiffMatchPatch from "diff-match-patch";

const CodeMirror = window?.CodeMirror || _CodeMirror;

// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;

export default defineComponent({
  name: "MergeMode",
  props: {
    options: {
      type: Object as PropType<EditorConfiguration>,
      default: () => ({}),
    },
    cminstance: {
      type: Object as PropType<Nullable<Editor>>,
      default: () => ({}),
    },
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const _cminstance = ref<unknown>();
    const mergeView = ref<HTMLElement>();

    const initialize = () => {
      _cminstance.value = markRaw(
        CodeMirror.MergeView(mergeView.value as HTMLElement, props.options)
      );
      emit("update:cminstance", _cminstance.value);
      emit("ready", _cminstance);
    };

    onMounted(() => {
      initialize();
    });

    return {
      initialize,
    };
  },
});
</script>

<style scoped lang="less"></style>
