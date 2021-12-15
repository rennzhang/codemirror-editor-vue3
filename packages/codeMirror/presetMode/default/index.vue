<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>

<script lanh="ts">
// lib
import _CodeMirror from "codemirror";
const CodeMirror = window.CodeMirror || _CodeMirror;
import { ref, watch, onMounted, markRaw, defineComponent } from "vue";

export default defineComponent({
  name: "defaultMode",
  props: {
    name: {
      type: String,
      default: `cm-textarea-${new Date().toString()}`,
    },
    code: String,
    value: String,
    content: String,
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

    const initialize = () => {
      _cminstance.value = markRaw(
        CodeMirror.fromTextArea(textarea.value, props.options)
      );
      emit("update:cminstance", _cminstance.value);

      let unwatch = null;

      unwatch = watch(
        () => props.cminstance,
        (val, oldVal) => {
          val &&
            props.cminstance.setValue(
              props.code || props.value || props.content
            );

          emit("ready", _cminstance);

          unwatch();
        },
        { deep: true }
      );
    };

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
