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
import { ref, defineComponent, onMounted, markRaw, watch, unref } from "vue";
// lib
import _CodeMirror from "../../../sourceLib";

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
      type: Object as PropType<Editor | null>,
      default: () => null,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: {
    ready: (instance: Editor): Editor | null => instance,
    "update:cminstance": (instance: Editor): Editor | null => instance,
  },
  setup(props, { emit }) {
    const textarea = ref();
    const _cminstance = ref<Editor | null>(null);

    const initialize = () => {
      _cminstance.value = markRaw(
        _CodeMirror.fromTextArea(textarea.value, props.options)
      );
      emit("update:cminstance", _cminstance.value);

      const unwatch: WatchStopHandle | null = watch(
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
