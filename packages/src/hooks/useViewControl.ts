import type { Ref } from "vue";
import { ref, unref, computed, nextTick } from "vue";

import type { Editor } from "codemirror";
import type { MergeView } from "codemirror/addon/merge/merge";
import type { CmProps } from "@/src/types/props";

export declare type UseViewControlParams = {
  props: CmProps;
  cminstance: Ref<Editor | MergeView | null>;
  presetRef: Ref<{ initialize: () => void } | null>;
};

export function useViewControl({ props, cminstance, presetRef }: UseViewControlParams) {
  const containerWidth = ref<string>("100%");
  const containerHeight = ref<string>("100%");

  const realCm = computed(
    () => (props.merge ? (unref(cminstance) as MergeView)?.editor() : unref(cminstance)) as Editor
  );
  const refresh = () => {
    nextTick(() => {
      realCm.value?.refresh();
    });
  };

  const resize = (width = props.width, height = props.height) => {
    let cmWidth = "100%";
    let cmHeight = "100%";
    console.log("resize", width, width);

    if (typeof width === "number") {
      cmWidth = `${String(width)}px`;
    } else if (width) {
      cmWidth = width;
    }

    if (typeof height === "number") {
      cmHeight = `${String(height)}px`;
    } else if (height) {
      cmHeight = height;
    }

    containerWidth.value = cmWidth;
    containerHeight.value = cmHeight;

    console.log("resize", cmWidth, cmHeight);

    realCm.value?.setSize("100%", "100%");
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
