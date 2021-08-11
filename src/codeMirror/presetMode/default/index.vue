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
// pollfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}
// base
// import "codemirror/lib/codemirror.css";
// import 'codemirror/mode/css/css.js'

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
<style lang="less">
.codemirror-container {
  position: relative;
  display: inline-block;
  height: 100%;
  width: fit-content;
  text-align: left !important;
  font-size: 12px;
  &.bordered {
    border-radius: 4px;
    border: 1px solid #dddddd;
  }
  &.width-auto {
    width: 100%;
  }
  &.height-auto {
    height: 100%;
    .CodeMirror,
    .cm-s-default {
      height: 100% !important;
    }
  }
}
.codemirror-container * {
  text-align: left;
}
.CodeMirror {
  line-height: 18px;
}
.CodeMirror-placeholder {
  color: #d1d5e9 !important;
}
.CodeMirror,
.CodeMirror-merge-pane {
  font-family: consolas !important;
}
</style>