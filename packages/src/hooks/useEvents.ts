import type { Editor } from "codemirror";
import type { ComponentInternalInstance, Ref } from "vue";
import type { CmProps } from "@/src/types/props";
import { componentsEvts, CMEvents } from "../config";

declare type UseEventsParams = {
  props: CmProps;
  cminstance: Ref<Editor>;
  emit: ((event: "ready", cm: Editor) => void) &
    ((event: "update:value", value: string) => void) &
    ((event: "change", value: string, cm: Editor) => void) &
    ((event: "input", value: string) => void) &
    ((event: string, ...args: any[]) => void);

  internalInstance: Nullable<ComponentInternalInstance>;
  content: Ref<string>;
};

export function scrollToEnd(cm: Editor) {
  Promise.resolve().then(() => {
    const nowScrollInfo = cm.getScrollInfo();
    cm.scrollTo(nowScrollInfo.left, nowScrollInfo.height);
  });
}

const useEvents = ({
  props,
  cminstance,
  emit,
  internalInstance,
  content,
}: UseEventsParams): { listenerEvents: () => void } => {
  /** @description 根据组件实例获取在该组件上监听的事件，用来确定需要 emit 的事件 */
  const getBindEvents = () => {
    const evts: CMEvents[] = [];
    Object.keys(internalInstance?.vnode.props as object).forEach((v) => {
      // 排除和当前组件相同的事件名称
      if (v.startsWith("on")) {
        const e: string = v.replace(v[2], v[2].toLowerCase()).slice(2);
        !componentsEvts[e] && evts.push(e as CMEvents);
      }
    });
    return evts;
  };

  /** @description listener events */
  const listenerEvents = () => {
    cminstance.value.on("change", (cm: Editor) => {
      const currentVal = cm.getValue();
      if (currentVal === content.value) return;
      // eslint-disable-next-line no-param-reassign
      content.value = currentVal;
      emit("update:value", content.value);
      emit("input", content.value);

      // 解决在 change 事件中不能使用 scrollTo的问题
      Promise.resolve().then(() => {
        emit("change", content.value, cm);
      });

      props.keepCursorInEnd && scrollToEnd(cm);
    });
    // const internalInstance.vnode.props
    // 所有有效事件（驼峰命名）+ 去重
    const tmpEvents: { [key: string]: boolean } = {};
    const bindEvts = getBindEvents();
    bindEvts
      // eslint-disable-next-line no-return-assign
      .filter((e) => !tmpEvents[e] && (tmpEvents[e] = true))
      .forEach((event) => {
        // 循环事件，并兼容 run-time 事件命名
        (cminstance.value as Editor).on(event, (...args: any[]) => {
          // console.log('当有事件触发了', event, args)
          emit(event, ...args);
        });
      });
  };

  return {
    listenerEvents,
  };
};
export { useEvents };
