<template>
  <div ref="mergeView" />
</template>

<script lang="ts">
import type { Editor, EditorConfiguration } from "codemirror";
import type { MergeView } from "codemirror/addon/merge/merge";
// merge css
import "codemirror/addon/merge/merge.css";
// merge js
import "codemirror/addon/merge/merge.js";
// google DiffMatchPatch
import DiffMatchPatch from "diff-match-patch";
import type { PropType } from "vue";
import { defineComponent, markRaw, onMounted, ref } from "vue";
import _CodeMirror from "../../../sourceLib";

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
      type: Object as PropType<Editor | null>,
      default: () => ({}),
    },
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const _cminstance = ref<MergeView>();
    const mergeView = ref<HTMLElement>();

    const initialize = () => {
      _cminstance.value = markRaw(
        _CodeMirror.MergeView(mergeView.value as HTMLElement, props.options)
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
