<template>
  <Codemirror
    v-model:value="store.code"
    :options="cmOptions"
    :height="store.height || '500px'"
    :width="store.width"
    class="cm-component"
    :border="store.border"
    @ready="onReady"
    @blur="onBlur"
    @focus="onFocus"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, computed, inject } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";

import "codemirror/addon/mode/overlay.js";
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/selection/mark-selection.js";

import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/matchesonscrollbar.css";

import "./config/lang";
import { useStore } from "./store";
const store = useStore();
const provideHeight = inject<number>("height");
store.height = provideHeight || store.height || "500";

const cmOptions: EditorConfiguration = reactive({
  mode: computed(() => (store.lang == "json" ? "javascript" : store.lang)),
  theme: computed(() => store.theme),
  readOnly: computed(() => store.readOnly),
  lineNumbers: true,
  lineWiseCopyCut: true,
  scrollbarStyle: "simple",
  showCursorWhenSelecting: true,
  styleSelectedText: true,
  styleActiveLine: false,
});

const cminstance = ref<Editor | null>(null);
const onReady = (cm: Editor) => {
  cminstance.value = cm;
  console.log(cm.getValue());
};

/** @description  */
const onBlur = (cm: Editor) => {
  console.log(" onBlur", cm);
  cm.setOption("styleActiveLine", false);
};
/** @description  */
const onFocus = (cm: Editor) => {
  console.log(" onBlur", cm);
  cm.setOption("styleActiveLine", true);
};

const _fontSize = computed(() => store.fontSize || "13px");
const _lineHeight = computed(() => store.lineHeight || "20px");

defineExpose({
  setTheme: (theme: string) => {
    cminstance.value?.setOption("theme", theme);
  },
});
</script>
<style lang="less" scoped>
.cm-component {
  font-family: monospace;
  font-size: v-bind(_fontSize);
  line-height: v-bind(_lineHeight);
}
</style>
