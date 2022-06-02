import type { Ref } from "vue";
import { ref, unref, computed } from "vue";

import type { Editor } from "codemirror";
import type { MergeView } from "codemirror/addon/merge/merge";
import type { CmProps } from "@/src/types/props";

export declare type UseViewControlParams = {
  props: CmProps;
  cminstance: Ref<Editor | MergeView | null>;
  presetRef: Ref<{ initialize: () => void } | null>;
};

export function useViewControl({
  props,
  cminstance,
  presetRef,
}: UseViewControlParams) {
  const containerWidth = ref<string | null>(null);
  const containerHeight = ref<string | null>(null);

  const realCm = computed(
    () =>
      (props.merge
        ? (unref(cminstance) as MergeView)?.editor()
        : unref(cminstance)) as Editor
  );
  const refresh = () => {
    nextTick(() => {
      realCm.value?.refresh();
    });
  };

  const resize = (width = props.width, height = props.height) => {
    containerWidth.value = String(width).replace("px", "");
    containerHeight.value = String(height).replace("px", "");
    const cmHeight = containerHeight.value;
    // if (props.merge) {
    //   cmHeight -= 2;
    // }
    realCm.value?.setSize(containerWidth.value, cmHeight);
  };

  const destroy = () => {
    // garbage cleanup
    const element = realCm.value?.getWrapperElement();
    element?.remove();
  };

  const reload = () => {
    // Save current values
    const history = realCm.value?.getDoc().getHistory();
    // props.options = cminstance.value.getValue()
    presetRef.value?.initialize();
    destroy();

    // Restore values
    realCm.value?.getDoc().setHistory(history);
  };

  const isStyleChaotic = () => {
    const gutterEl: HTMLElement | null = document.querySelector(
      ".CodeMirror-gutters"
    );
    const gutterElLeft = gutterEl?.style.left.replace("px", "");
    return gutterElLeft !== "0";
  };

  const reviseStyle = () => {
    refresh();

    if (!isStyleChaotic()) return;

    const timer = setInterval(() => {
      isStyleChaotic() ? refresh() : clearInterval(timer);
    }, 60);

    const clearTimer = setTimeout(() => {
      clearInterval(timer);
      clearTimeout(clearTimer);
    }, 400);
  };

  return {
    reload,
    refresh,
    resize,
    destroy,
    containerHeight,
    reviseStyle,
  };
}
