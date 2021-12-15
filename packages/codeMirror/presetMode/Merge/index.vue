<template>
  <div ref="mergeView" :name="$props.name" />
</template>
<script lang="ts">
// lib
import _CodeMirror from "codemirror";
import { ref, onMounted, markRaw, defineComponent } from "vue";

// merge css
import "codemirror/addon/merge/merge.css";

// merge js
import "codemirror/addon/merge/merge.js";

// google DiffMatchPatch
import DiffMatchPatch from "diff-match-patch";

declare const window: any;

const CodeMirror = window?.CodeMirror || _CodeMirror;

// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;

export default defineComponent({
  name: "mergeMode",
  props: {
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
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const _cminstance = ref(null);
    const mergeView = ref(null);

    const initialize = () => {
      _cminstance.value = markRaw(
        CodeMirror.MergeView(mergeView.value, props.options)
      );
      emit("update:cminstance", _cminstance.value.edit);
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
