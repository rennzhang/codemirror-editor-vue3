<template>
  <textarea
    ref="textarea"
    :name="$props.name"
    :placeholder="$props.placeholder"
  ></textarea>
</template>

<script lang="ts">
import type { PropType, WatchStopHandle } from "vue";
import type { Editor, EditorConfiguration } from "codemirror";
// lib
import _CodeMirror from "codemirror";

const CodeMirror = window.CodeMirror || _CodeMirror;

export default defineComponent({
  name: "DefaultMode",
  props: {
    name: {
      type: String as PropType<string>,
      default: `cm-textarea-${+new Date()}`,
    },
    value: {
      type: String as PropType<string>,
      default: "",
    },
    content: {
      type: String as PropType<string>,
      default: "",
    },
    options: {
      type: Object as PropType<EditorConfiguration>,
      default: () => ({}),
    },
    cminstance: {
      type: Object as PropType<Nullable<Editor>>,
      default: () => null,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: {
    ready: (instance: Editor): Nullable<Editor> => instance,
    "update:cminstance": (instance: Editor): Nullable<Editor> => instance,
  },
  setup(props, { emit }) {
    const textarea = ref();
    const _cminstance = ref<Nullable<Editor>>(null);

    const initialize = () => {
      _cminstance.value = markRaw(
        CodeMirror.fromTextArea(textarea.value, props.options)
      );
      emit("update:cminstance", _cminstance.value);

      const unwatch: Nullable<WatchStopHandle> = watch(
        () => props.cminstance,
        (val) => {
          val && props.cminstance?.setValue(props.value || props.content);

          emit("ready", unref(_cminstance) as Editor);
          unwatch?.();
        },
        { deep: true }
      );
    };

    onMounted(() => {
      initialize();
    });

    return {
      textarea,
      initialize,
    };
  },
});
</script>

<style scoped lang="less"></style>