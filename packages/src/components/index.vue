<template>
  <div
    class="codemirror-container"
    :class="{
      merge: $props.merge,
      bordered: $props.border || $props.merge,
      'width-auto': !$props.width || $props.width == '100%',
      'height-auto': !$props.height || $props.height == '100%',
    }"
    :style="{
      height: containerHeight + 'px',
    }"
  >
    <component
      :is="presetModeName"
      ref="presetRef"
      v-model:cminstance="cminstance"
      style="height: 100%"
      v-bind="{
        ...$props,
        ...$attrs,
        options: cmOptions,
        name: instanceName,
        content,
      }"
      @ready="ready"
    ></component>
  </div>
</template>

<script lang="ts">
import type { Ref, PropType } from "vue";
import type { Editor, EditorConfiguration } from "codemirror";

// base style
import "codemirror/lib/codemirror.css";
// component
import Default from "./presetMode/default/index.vue";
import Merge from "./presetMode/Merge/index.vue";
import FcLog from "./presetMode/log/index.vue";

// hooks
import { useEvents } from "../hooks/useEvents";
import { useViewControl } from "../hooks/useViewControl";

// config
import { componentsEvts, getCmEvts, DEFAULT_OPTIONS } from "../config/index";

// pollfill
if (typeof Object.assign !== "function") {
  Object.defineProperty(Object, "assign", {
    value(target: any, varArgs: any) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      const to = Object(target);
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < arguments.length; index++) {
        // eslint-disable-next-line prefer-rest-params
        const nextSource = arguments[index];
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

export default defineComponent({
  name: "CodemirrorEditor",
  components: {
    Default,
    Merge,
    FcLog,
  },
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
    options: {
      type: Object as PropType<EditorConfiguration>,
      default: () => DEFAULT_OPTIONS,
    },
    globalOptions: {
      type: Object as PropType<EditorConfiguration>,
      default: () => DEFAULT_OPTIONS,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    },
    border: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: null,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: null,
    },
    keepCursorInEnd: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    merge: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    name: {
      type: String as PropType<string>,
      default: "",
    },
    marker: {
      type: Function as PropType<() => HTMLElement>,
      default: () => null,
    },
    unseenLines: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
  },
  emits: { ...componentsEvts, ...getCmEvts() },

  setup(props, { emit }) {
    const cminstance = ref<Nullable<Editor>>(null);
    const content = ref("");
    const presetModeName = ref<"Default" | "Merge" | "FcLog">("Default");
    const cmOptions = ref<any>({
      ...DEFAULT_OPTIONS,
      ...props.globalOptions,
      ...props.options,
    });

    const internalInstance = getCurrentInstance();
    const presetRef = ref(null);

    const { refresh, resize, destroy, containerHeight, reviseStyle } =
      useViewControl({
        props,
        cminstance,
        presetRef,
      });

    const { listenerEvents } = useEvents({
      props,
      cminstance: cminstance as Ref<Editor>,
      emit,
      internalInstance,
      content,
    });

    const unseenLineMarkers = () => {
      if (props.unseenLines !== undefined && props.marker !== undefined) {
        props.unseenLines.forEach((line) => {
          const info = cminstance.value?.lineInfo(line);
          cminstance.value?.setGutterMarker(
            line,
            "breakpoints",
            info?.gutterMarkers ? null : props.marker()
          );
        });
      }
    };

    const onCodeChange = (newVal: string) => {
      const CM_VALUE = cminstance.value?.getValue();
      if (newVal !== CM_VALUE) {
        cminstance.value?.setValue(newVal);
        content.value = newVal;
        reviseStyle();
      }
      unseenLineMarkers();
    };

    /** @description  */
    const ready = () => {
      listenerEvents();
      unseenLineMarkers();

      // prevents funky dynamic rendering
      resize();
      emit("ready", cminstance.value as Editor);
      watch(
        [() => props.height, () => props.width],
        ([height, width]) => {
          resize(height, width);
        },
        { deep: true }
      );
    };

    const handlePresetModeName = () => {
      if (props.options.mode === "fclog" || props.options.mode === "log") {
        presetModeName.value = "FcLog";
        return;
      }
      if (props.merge) {
        presetModeName.value = "Merge";
        return;
      }
      presetModeName.value = "Default";
    };

    watch(
      () => props.options,
      (val) => {
        // eslint-disable-next-line guard-for-in
        for (const key in props.options) {
          cminstance.value?.setOption(
            key as keyof EditorConfiguration,
            val[key as keyof EditorConfiguration]
          );
        }
      },
      { deep: true }
    );

    watch(
      () => props.value,
      (val) => {
        onCodeChange(val);
      }
    );

    watch(
      () => props.merge,
      (val) => {
        handlePresetModeName();
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      destroy();
    });

    return {
      presetModeName,
      cmOptions,
      cminstance,
      content,
      ready,
      resize,
      refresh,
      containerHeight,
      instanceName:
        props.name || internalInstance?.parent?.type?.name || undefined,
      presetRef,
    };
  },
});
</script>

<style scoped lang="less"></style>
