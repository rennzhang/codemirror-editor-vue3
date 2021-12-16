import { ref, nextTick } from "vue";
export function useViewControl({ props, cminstance, presetRef }) {
  const containerWidth = ref(null);
  const containerHeight = ref(null);

  const refresh = () => {
    nextTick(() => {
      cminstance.value.refresh();
    });
  };

  const resize = (width = props.width, height = props.height) => {
    containerWidth.value = String(width).replace("px", "");
    containerHeight.value = String(height).replace("px", "");
    let cmHeight = containerHeight.value;
    // if (props.merge) {
    //   cmHeight -= 2;
    // }
    cminstance.value.setSize(containerWidth.value, cmHeight);
  };

  const destroy = () => {
    // garbage cleanup
    const element = cminstance.value.doc.cm.getWrapperElement();
    element?.remove();
  };

  const reload = () => {
    // Save current values
    const history = cminstance.value.doc.history;
    const cleanGeneration = cminstance.value.doc.cleanGeneration;
    // props.options = cminstance.value.getValue()
    presetRef.value.initialize();
    destroy();

    // Restore values
    cminstance.value.doc.history = history;
    cminstance.value.doc.cleanGeneration = cleanGeneration;
  };

  const isStyleChaotic = () => {
    const gutterEl: HTMLElement = document.querySelector(".CodeMirror-gutters");
    const gutterElLeft = gutterEl.style.left.replace("px", "");
    return gutterElLeft != "0";
  };

  const reviseStyle = () => {
    refresh();
    if (!isStyleChaotic()) return;
    let timer = setInterval(() => {
      isStyleChaotic() ? refresh() : clearInterval(timer);
    }, 60);
    let clearTimer = setTimeout(() => {
      clearInterval(timer);
      clearTimeout(clearTimer);
      timer = null;
      clearTimer = null;
    }, 400);
  };

  return {
    refresh,
    resize,
    destroy,
    containerHeight,
    reviseStyle,
  };
}
