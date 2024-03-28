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

export function useViewControl({ props, cminstance, presetRef }: UseViewControlParams) {
  const containerWidth = ref<string>("auto");
  const containerHeight = ref<string>("auto");

  const realCm = computed(
    () => (props.merge ? (unref(cminstance) as MergeView)?.editor() : unref(cminstance)) as Editor,
  );
  const refresh = () => {
    nextTick(() => {
      realCm.value?.refresh();
    });
  };

  const resize = (width = props.width, height = props.height) => {
    let cmHeight = "";
    let cmWidth = "";
    if (String(width).includes("%")) {
      cmWidth = "100%";
      containerWidth.value = String(width);
    } else {
      cmWidth = String(width).replace("px", "");
      containerWidth.value = `${cmWidth}px`;
    }

    if (String(height).includes("%")) {
      cmHeight = "100%";
      containerHeight.value = String(height);
    } else {
      cmHeight = String(height).replace("px", "");
      containerHeight.value = `${cmHeight}px`;
    }

    realCm.value?.setSize(cmWidth, cmHeight);
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
    const gutterEl: HTMLElement | null = document.querySelector(".CodeMirror-gutters");
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
    containerWidth,
    containerHeight,
    reviseStyle,
  };
}
