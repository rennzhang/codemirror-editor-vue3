<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>
<script>
import _CodeMirror from 'codemirror'
const CodeMirror = window.CodeMirror || _CodeMirror
import { ref, watch, onMounted, markRaw, computed, defineComponent } from "vue";
import { getLinkMark, getLogMark, } from "./utils.ts";

import "./languages/fclog/index";
import "./languages/simpleLog/index.js";
// import 'codemirror/addon/lint/lint.css'
export default defineComponent({
  name: "codemirror-fclog",
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
    KeepCursorInEnd: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const textarea = ref()
    const codemirror = ref(null)
    const _KeepCursorInEnd = computed(() => props.KeepCursorInEnd)
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
          { replacedWith: mark.node },
        );
      }
    };


    const scrollToEnd = () => {
      Promise.resolve().then(() => {
        let nowScrollInfo = props.cminstance.getScrollInfo();
        props.cminstance.scrollTo(nowScrollInfo.left, nowScrollInfo.height)
      })
    };

    const initialize = () => {
      codemirror.value = markRaw(CodeMirror.fromTextArea(textarea.value, props.options))
      emit("update:cminstance", markRaw(codemirror.value))
      codemirror.value.on("change", (cm) => {
        renderTextMark();
        _KeepCursorInEnd && scrollToEnd()
      });

    }

    watch(() => props.cminstance, (val) => {
      if (val) {
        renderTextMark(props.cminstance)
        props.cminstance.setValue(props.code || props.value || props.content)
        emit('ready', codemirror)
      }
    }, { deep: true, immediate: true });

    onMounted(() => {
      initialize()
    })
    return {
      initialize,
      textarea,
    };
  },
});
</script>

<style>
.editor_custom_link {
  cursor: pointer;
  color: #1474f1;
  text-decoration: underline;
}
.editor_custom_link:hover {
  color: #04b4fa;
}
.c-editor--log__error {
  color: #bb0606;
  font-weight: bold;
}
.c-editor--log__info {
  color: #333333;
  font-weight: bold;
}
.c-editor--log__warning {
  color: #ee9900;
}
.c-editor--log__success {
  color: #669600;
}
.cm-header,
.cm-strong {
  font-weight: bold;
}
</style>