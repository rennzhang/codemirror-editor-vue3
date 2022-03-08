import type { Ref } from "vue";
import { ref } from "vue";

import type { Editor } from "codemirror";
import type { CmProps } from "@/src/types/props";

export declare type UseViewControlParams = {
  props: CmProps;
  cminstance: Ref<Nullable<Editor>>;
  presetRef: Ref<Nullable<{ initialize: () => void }>>;
};

export function useViewControl({
  props,
  cminstance,
  presetRef,
}: UseViewControlParams) {
  const containerWidth = ref<Nullable<string>>(null);
  const containerHeight = ref<Nullable<string>>(null);

  const refresh = () => {
    nextTick(() => {
      cminstance.value?.refresh();
    });
  };

  const resize = (width = props.width, height = props.height) => {
    containerWidth.value = String(width).replace("px", "");
    containerHeight.value = String(height).replace("px", "");
    const cmHeight = containerHeight.value;
    // if (props.merge) {
    //   cmHeight -= 2;
    // }
    cminstance.value?.setSize(containerWidth.value, cmHeight);
  };

  const destroy = () => {
    // garbage cleanup
    const element = cminstance.value?.getWrapperElement();
    element?.remove();
  };

  const reload = () => {
    // Save current values
    const history = cminstance.value?.getDoc().getHistory();
    // props.options = cminstance.value.getValue()
    presetRef.value?.initialize();
    destroy();

    // Restore values
    cminstance.value?.getDoc().setHistory(history);
  };

  const isStyleChaotic = () => {
    const gutterEl: Nullable<HTMLElement> = document.querySelector(
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
