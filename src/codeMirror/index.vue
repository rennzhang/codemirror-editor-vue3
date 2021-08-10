<template>
  <div
    class="codemirror-container"
    :class="{
      merge: $props.merge,
      bordered: $props.border,
      'width-auto': !$props.width || $props.width == '100%',
      'height-auto': !$props.height || $props.height == '100%',
    }"
  >
    <component
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

<script>
// lib
import { ref, watch, nextTick, getCurrentInstance, onBeforeUnmount, defineAsyncComponent } from "vue"
// pollfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}
// base
import "codemirror/lib/codemirror.css";
import 'codemirror/mode/css/css.js'

// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/scroll/simplescrollbars.css'

// import 'codemirror/mode/properties/properties'
// import 'codemirror/addon/edit/matchbrackets'
// import 'codemirror/addon/scroll/simplescrollbars'
const defaulOptions = {
  mode: "text", // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  // 在行槽中添加行号显示器、折叠器、语法检测器`
  gutters: ["CodeMirror-linenumbers"],
  foldGutter: true, // 启用行槽中的代码折叠
  matchBrackets: true, // 匹配结束符号，比如"]、}"
  autoCloseBrackets: true, // 自动闭合符号
  // styleActiveLine: true, // 显示选中行的样式
}

// component define events
const componentsEvts = [
  "update:value",
  "change",
  "ready",
]

// codemirror events
const cmEvts = [
  'changes',
  'scroll',
  'beforeChange',
  'cursorActivity',
  'keyHandled',
  'inputRead',
  'electricInput',
  'beforeSelectionChange',
  'viewportChange',
  'swapDoc',
  'gutterClick',
  'gutterContextMenu',
  'focus',
  'blur',
  'refresh',
  'optionChange',
  'scrollCursorIntoView',
  'update'
]
// export
export default {
  name: 'CodemirrorEditor',
  props: {
    code: String,
    value: String,
    marker: Function,
    unseenLines: Array,
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },

    merge: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    },


    border: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
  },
  emits: [
    ...componentsEvts,
    ...cmEvts
  ],
  components: {
    Default: defineAsyncComponent(() => import("./presetMode/default/index.vue")),
    Merge: defineAsyncComponent(() => import("./presetMode/Merge/index.vue")),
    DtLog: defineAsyncComponent(() => import("./presetMode/log/index.vue"))
  },
  setup(props, ctx) {
    const cminstance = ref(null)
    const content = ref("")
    const presetModeName = ref()
    const cmOptions = ref(Object.assign({ ...defaulOptions }, props.globalOptions, props.options))
    const internalInstance = getCurrentInstance()
    const presetRef = ref(null)

    const refresh = () => {
      nextTick(() => {
        cminstance.value.refresh()
      })
    }

    const resize = (width = props.width, height = props.height) => {
      cminstance.value.setSize(width, height)
    }

    const unseenLineMarkers = () => {
      if (props.unseenLines !== undefined && marker !== undefined) {
        props.unseenLines.forEach(line => {
          const info = cminstance.value.lineInfo(line)
          cminstance.value.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : marker())
        })
      }
    }


    const destroy = () => {
      // garbage cleanup
      const element = cminstance.value.doc.cm.getWrapperElement()
      element?.remove()
    }

    const handerCodeChange = (newVal) => {
      const cm_value = cminstance.value.getValue()
      if (newVal !== cm_value) {
        const scrollInfo = cminstance.value.getScrollInfo()
        cminstance.value.setValue(newVal)
        content.value = newVal
        cminstance.value.scrollTo(scrollInfo.left, scrollInfo.top)
      }
      unseenLineMarkers()
    }

    const reload = () => {
      // Save current values
      const history = cminstance.value.doc.history
      const cleanGeneration = cminstance.value.doc.cleanGeneration
      // props.options = cminstance.value.getValue()
      presetRef.value.initialize()
      destroy()
      //   initialize()

      // Restore values
      cminstance.value.doc.history = history
      cminstance.value.doc.cleanGeneration = cleanGeneration
    }
    const { listenerEvents } = useEvents({ cminstance, ctx, internalInstance, content })


    /** @description  */
    const ready = (codemirror) => {
      listenerEvents()
      unseenLineMarkers()

      // prevents funky dynamic rendering
      resize()
      refresh()
      // reload()
      ctx.emit('ready', cminstance.value)

    };

    watch(() => props.options, (val) => {
      for (const key in props.options) {
        cminstance.value.setOption(key, val[key])
      }
    }, { deep: true, })


    watch(() => props.value, (val) => { handerCodeChange(val) })


    /** @description  */
    const handlePresetModeName = () => {
      console.log(props.options.mode);
      if (props.options.mode == 'fclog' || props.options.mode == "log") {
        presetModeName.value = "DtLog"
        return
      }
      if (props.merge) {
        presetModeName.value = "Merge"
        return
      }
      presetModeName.value = "default"
    };

    watch(() => props.merge, (val) => { handlePresetModeName() }, { immediate: true })

    onBeforeUnmount(() => {
      destroy()
    })

    return {
      presetModeName,
      cmOptions,
      cminstance,
      content,
      ready,
      resize,
      instanceName: internalInstance?.parent?.type?.name,
      presetRef,
    }
  },

}
function useEvents({ cminstance, ctx, internalInstance, content }) {
  /** @description 根据组件实例获取在该组件上监听的事件，用来确定需要 emit 的事件 */
  const getUseEvents = () => {
    let evts = []
    Object.keys(internalInstance.vnode.props).forEach(v => {
      // 排除和当前组件相同的事件名称
      if (v.startsWith("on")) {
        let e = v.replace(v[2], v[2].toLowerCase()).slice(2)
        !componentsEvts.includes(e) && evts.push(e)
      }
    })
    return evts
  };


  /** @description listener events */
  const listenerEvents = () => {
    cminstance.value.on('change', cm => {
      content.value = cm.getValue()
      ctx.emit('update:value', content.value)
      ctx.emit('change', content.value, cm)
    })
    // const internalInstance.vnode.props
    // 所有有效事件（驼峰命名）+ 去重
    const tmpEvents = {}
    const useEvts = getUseEvents()
    const allEvents = useEvts
      .filter(e => (!tmpEvents[e] && (tmpEvents[e] = true)))
      .forEach(event => {
        // 循环事件，并兼容 run-time 事件命名
        cminstance.value.on(event, (...args) => {
          // console.log('当有事件触发了', event, args)
          ctx.emit(event, ...args)
        })
      })

    return allEvents
  };

  return {
    listenerEvents
  }
}
</script>
<style lang="less">
.codemirror-container {
  position: relative;
  display: inline-block;
  height: 100%;
  width: fit-content;
  text-align: left !important;
  font-size: 12px;
  &.bordered {
    border-radius: 4px;
    border: 1px solid #dddddd;
  }
  &.width-auto {
    width: 100%;
  }
  &.height-auto {
    height: 100%;
    .CodeMirror,
    .cm-s-default {
      height: 100% !important;
    }
  }
}
.codemirror-container * {
  text-align: left;
}
.CodeMirror {
  line-height: 18px;
}
.CodeMirror-lines .CodeMirror-placeholder.CodeMirror-line-like {
  color: #666;
}
.CodeMirror,
.CodeMirror-merge-pane {
  font-family: consolas !important;
}
</style>