export function scrollToEnd(cm) {
  Promise.resolve().then(() => {
    let nowScrollInfo = cm.getScrollInfo();
    cm.scrollTo(nowScrollInfo.left, nowScrollInfo.height);
  });
}

export function useEvents({
  props,
  cminstance,
  ctx,
  internalInstance,
  content,
  componentsEvts,
}) {
  /** @description 根据组件实例获取在该组件上监听的事件，用来确定需要 emit 的事件 */
  const getUseEvents = () => {
    let evts = [];
    Object.keys(internalInstance.vnode.props).forEach((v) => {
      // 排除和当前组件相同的事件名称
      if (v.startsWith("on")) {
        let e = v.replace(v[2], v[2].toLowerCase()).slice(2);
        !componentsEvts.includes(e) && evts.push(e);
      }
    });
    return evts;
  };

  /** @description listener events */
  const listenerEvents = () => {
    cminstance.value.on("change", (cm) => {
      const currentVal = cm.getValue();
      if (currentVal == content.value) return;
      content.value = currentVal;
      ctx.emit("update:value", content.value);
      ctx.emit("input", content.value);

      // 解决在 change 事件中不能使用 scrollTo的问题
      Promise.resolve().then(() => {
        ctx.emit("change", content.value, cm);
      });

      props.KeepCursorInEnd && scrollToEnd(cm);
    });
    // const internalInstance.vnode.props
    // 所有有效事件（驼峰命名）+ 去重
    const tmpEvents = {};
    const useEvts = getUseEvents();
    const allEvents = useEvts
      .filter((e) => !tmpEvents[e] && (tmpEvents[e] = true))
      .forEach((event) => {
        // 循环事件，并兼容 run-time 事件命名
        cminstance.value.on(event, (...args) => {
          // console.log('当有事件触发了', event, args)
          ctx.emit(event, ...args);
        });
      });

    return allEvents;
  };

  return {
    listenerEvents,
  };
}
