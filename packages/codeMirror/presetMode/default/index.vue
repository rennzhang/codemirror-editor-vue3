<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>

<script>
// lib
import _CodeMirror from 'codemirror'
const CodeMirror = window.CodeMirror || _CodeMirror
import { ref, watch, onMounted, markRaw, defineComponent } from "vue"
// export
export default defineComponent({
  name: 'codemirror',
  props: {
    code: String,
    value: String,
    content: String,
    options: {
      type: Object,
      default: () => ({})
    },
    cminstance: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  emits: ["update:cminstance", "ready"],

  setup(props, { emit }) {
    const textarea = ref()
    const codemirror = ref(null)

    const initialize = () => {
      codemirror.value = markRaw(CodeMirror.fromTextArea(textarea.value, props.options))
      emit("update:cminstance", markRaw(codemirror.value))

      let unwatch = null

      unwatch = watch(
        () => props.cminstance,
        (val, oldVal) => {

          val && props.cminstance.setValue(props.code || props.value || props.content)

          emit('ready', codemirror)

          unwatch()

        }, { deep: true });

    }

    onMounted(() => {
      initialize()
    })

    return {
      initialize,
      textarea,
    }
  },

})
</script>