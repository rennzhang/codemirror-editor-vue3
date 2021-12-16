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
      style="height: 100%"
      :is="presetModeName"
      ref="presetRef"
      v-model:cminstance="cminstance"
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
import _CodeMirror from "codemirror";

// base style
import "codemirror/lib/codemirror.css";

import {
  ref,
  watch,
  getCurrentInstance,
  onBeforeUnmount,
  defineComponent,
} from "vue";

// pollfill
if (typeof Object.assign != "function") {
  Object.defineProperty(Object, "assign", {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      const to = Object(target);
      for (let index = 1; index < arguments.length; index++) {
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
// component
import Default from "./presetMode/default/index.vue";
import Merge from "./presetMode/Merge/index.vue";
import FcLog from "./presetMode/log/index.vue";

// hooks
import { useEvents } from "./hooks/useEvents";
import { useViewControl } from "./hooks/useViewControl";

// config
import { componentsEvts, cmEvts, DEFAULT_OPTIONS } from "./config/index";

export default defineComponent({
  name: "CodemirrorEditor",
  props: {
    value: String,
    marker: Function,
    unseenLines: Array,
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },

    merge: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    globalOptions: {
      type: Object,
      default: () => ({}),
    },
    border: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    KeepCursorInEnd: {
      type: Boolean,
      default: false,
    },
  },
  emits: [...componentsEvts, ...cmEvts],

  components: {
    // Default: defineAsyncComponent(() => import("./presetMode/default/index.vue")),
    // Merge: defineAsyncComponent(() => import("./presetMode/Merge/index.vue")),
    // FcLog: defineAsyncComponent(() => import("./presetMode/log/index.vue"))
    Default,
    Merge,
    FcLog,
  },
  setup(props, ctx) {
    const cminstance = ref(null);
    const content = ref("");
    const presetModeName = ref("Default");
    const cmOptions = ref(
      Object.assign({ ...DEFAULT_OPTIONS }, props.globalOptions, props.options)
    );

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
      cminstance,
      ctx,
      internalInstance,
      content,
      componentsEvts,
    });

    const unseenLineMarkers = () => {
      if (props.unseenLines !== undefined && props.marker !== undefined) {
        props.unseenLines.forEach((line) => {
          const info = cminstance.value.lineInfo(line);
          cminstance.value.setGutterMarker(
            line,
            "breakpoints",
            info.gutterMarkers ? null : props.marker()
          );
        });
      }
    };

    const onCodeChange = (newVal) => {
      const cm_value = cminstance.value.getValue();
      if (newVal !== cm_value) {
        cminstance.value.setValue(newVal);
        content.value = newVal;
        reviseStyle();
      }
      unseenLineMarkers();
    };

    /** @description  */
    const ready = (codemirror) => {
      listenerEvents();
      unseenLineMarkers();

      // prevents funky dynamic rendering
      resize();
      ctx.emit("ready", cminstance.value);
      watch(
        [() => props.height, () => props.width],
        ([height, width]) => {
          resize(height, width);
        },
        { deep: true }
      );
    };

    const handlePresetModeName = () => {
      if (props.options.mode == "fclog" || props.options.mode == "log") {
        presetModeName.value = "FcLog";
        return;
      }
      if (props.merge) {
        presetModeName.value = "Merge";
        return;
      }
      presetModeName.value = "default";
    };

    watch(
      () => props.options,
      (val) => {
        for (const key in props.options) {
          cminstance.value.setOption(key, val[key]);
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
      containerHeight,
      instanceName:
        props.name || internalInstance?.parent?.type?.name || undefined,
      presetRef,
    };
  },
});
</script>
