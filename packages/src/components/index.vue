<template>
  <div
    class="codemirror-container"
    :class="{
      merge: $props.merge,
      bordered: $props.border || ($props.merge && !props.originalStyle),
      'width-auto': !$props.width || $props.width == '100%',
      'height-auto': !$props.height || $props.height == '100%',
      'original-style': props.originalStyle,
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

<script lang="ts" setup>
  import type { Ref, PropType, Component } from "vue";
  import type { Editor, EditorConfiguration } from "codemirror";
  import {
    ref,
    shallowRef,
    getCurrentInstance,
    watch,
    onBeforeUnmount,
    unref,
    defineExpose,
    computed,
  } from "vue";
  import "codemirror/lib/codemirror.css";
  import Default from "./presetMode/default/index.vue";
  import Merge from "./presetMode/Merge/index.vue";
  import FcLog from "./presetMode/log/index.vue";
  import { useEvents } from "../hooks/useEvents";
  import { useViewControl } from "../hooks/useViewControl";
  import { DEFAULT_OPTIONS, emitOptions } from "../config/index";

  if (typeof Object.assign !== "function") {
    Object.defineProperty(Object, "assign", {
      value(target: any) {
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

  const props = defineProps({
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
      type: [String, Number] as PropType<string | number | null>,
      default: null,
    },
    height: {
      type: [String, Number] as PropType<string | number | null>,
      default: null,
    },
    originalStyle: {
      type: Boolean as PropType<boolean>,
      default: false,
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
  });

  const emit = defineEmits(emitOptions);
  const cminstance = ref<Editor | null>(null);
  const content = ref("");
  const presetModeName = shallowRef<Component>(Default);
  const cmOptions = ref<EditorConfiguration>({
    ...DEFAULT_OPTIONS,
    ...props.globalOptions,
    ...props.options,
  });
  const internalInstance = getCurrentInstance();
  const instanceName = props.name || internalInstance?.parent?.type?.name || undefined;
  const presetRef = ref(null);

  const realCminstance = computed<Editor>(() =>
    props.merge ? (unref(cminstance) as any)?.editor() : unref(cminstance),
  );
  const { refresh, resize, destroy, containerHeight, reviseStyle } = useViewControl({
    props,
    cminstance,
    presetRef,
  });

  const { listenerEvents } = useEvents({
    props,
    cminstance: cminstance as Ref<Editor>,
    emit: emit as any,
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
          info?.gutterMarkers ? null : props.marker(),
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
    resize(props.width, props.height);
    emit("ready", cminstance.value as Editor);
    watch(
      [() => props.width, () => props.height],
      ([width, height]) => {
        resize(width, height);
      },
      { deep: true },
    );
  };

  const handlePresetModeName = () => {
    if (props.options.mode === "fclog" || props.options.mode === "log") {
      presetModeName.value = FcLog;
      return;
    }
    if (props.merge) {
      presetModeName.value = Merge;
      return;
    }
    presetModeName.value = Default;
  };

  watch(
    () => props.options,
    (val) => {
      // eslint-disable-next-line guard-for-in
      for (const key in props.options) {
        realCminstance.value?.setOption(
          key as keyof EditorConfiguration,
          unref(val[key as keyof EditorConfiguration]),
        );
      }
    },
    { deep: true },
  );

  watch(
    () => props.value,
    (val) => {
      onCodeChange(val);
    },
  );

  // watch(
  //   () => props.placeholder,
  //   (val) => {
  //     realCminstance.value?.setOption("placeholder", val);
  //   }
  // );
  watch(() => props.merge, handlePresetModeName, { immediate: true });

  onBeforeUnmount(() => {
    destroy();
  });
  defineExpose({
    cminstance,
    resize,
    refresh,
    destroy,
  });
</script>
