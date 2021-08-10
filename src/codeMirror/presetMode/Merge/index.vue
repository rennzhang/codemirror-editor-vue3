
<template>
  <div ref="mergeView" />
</template>
<script>
// lib
import _CodeMirror from 'codemirror'
const CodeMirror = window.CodeMirror || _CodeMirror
import { ref, onMounted, markRaw } from "vue"


// merge css
import 'codemirror/addon/merge/merge.css'

// merge js
import 'codemirror/addon/merge/merge.js'

// google DiffMatchPatch
import DiffMatchPatch from 'diff-match-patch'

// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

export default {
  name: "mergemode",
  props: {

    options: {
      type: Object,
      default: () => ({})
    },
    cminstance: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: [String, Number],
      default: null
    },
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const codemirror = ref(null)
    const mergeView = ref(null)
    const height = String(props.height).replace('px', "") + 'px'
    const initialize = () => {
      codemirror.value = markRaw(CodeMirror.MergeView(mergeView.value, props.options))
      emit("update:cminstance", markRaw(codemirror.value.edit))

      document.querySelector('.CodeMirror-merge').style.height = height
      document.querySelector('.CodeMirror-merge-right .CodeMirror').style.height = height
      emit('ready', codemirror)

    }
    onMounted(() => {
      initialize()
    })

    return {
      mergeView,
      initialize
    }
  },
};
</script>

