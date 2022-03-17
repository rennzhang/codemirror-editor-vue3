<template>
  <div ref="mergeView" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, markRaw } from "vue";
import type { Editor, EditorConfiguration } from "codemirror";
import type { MergeView } from "codemirror/addon/merge/merge";

import type { PropType } from "vue";

// lib
import _CodeMirror from "codemirror";

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
    const _cminstance = ref<MergeView>();
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
      mergeView,
      initialize,
    };
  },
});
</script>

<style scoped lang="less"></style>
