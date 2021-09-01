<template>
  <div
    class="codemirror-container"
    :class="{
      merge: $props.merge,
      bordered: !$props.merge && $props.border,
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

<script>
import _CodeMirror from 'codemirror'
const CodeMirror = window.CodeMirror || _CodeMirror

// base style
import "codemirror/lib/codemirror.css";

import { ref, watch, nextTick, getCurrentInstance, onBeforeUnmount, defineComponent } from "vue"
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
import Default from './presetMode/default/index.vue'
import Merge from './presetMode/Merge/index.vue'
import FcLog from './presetMode/log/index.vue'

const defaulOptions = {
  mode: "text", // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  foldGutter: true, // 启用行槽中的代码折叠
  matchBrackets: true, // 匹配结束符号，比如"]、}"
  autoCloseBrackets: true, // 自动闭合符号
  styleActiveLine: true, // 显示选中行的样式
}

// component define events
const componentsEvts = [
  "update:value",
  "change",
  "input",
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
export default defineComponent({
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
    KeepCursorInEnd: {
      type: Boolean,
      default: false
    },
  },
  emits: [
    ...componentsEvts,
    ...cmEvts
  ],

  components: {
    // Default: defineAsyncComponent(() => import("./presetMode/default/index.vue")),
    // Merge: defineAsyncComponent(() => import("./presetMode/Merge/index.vue")),
    // FcLog: defineAsyncComponent(() => import("./presetMode/log/index.vue"))
    Default,
    Merge,
    FcLog
  },
  setup(props, ctx) {
    const cminstance = ref(null)
    const content = ref("")
    const presetModeName = ref("Default")
    const cmOptions = ref(Object.assign({ ...defaulOptions }, props.globalOptions, props.options))
    const internalInstance = getCurrentInstance()
    const presetRef = ref(null)

    const containerWidth = ref(null)
    const containerHeight = ref(null)
    const refresh = () => {
      nextTick(() => {
        cminstance.value.refresh()
      })
    }

    const resize = (width = props.width, height = props.height) => {
      containerWidth.value = String(width).replace("px", "")
      containerHeight.value = String(height).replace("px", "")
      let cmHeight = containerHeight.value
      if (props.merge) {
        cmHeight -= 2
      }
      cminstance.value.setSize(containerWidth.value, cmHeight)
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
      // refresh()
      ctx.emit('ready', cminstance.value)
      watch([() => props.height, () => props.width], ([height, width]) => {
        resize(height, width)
      }, { deep: true })
    };

    watch(() => props.options, (val) => {
      for (const key in props.options) {
        cminstance.value.setOption(key, val[key])
      }
    }, { deep: true, })


    watch(() => props.value, (val) => { handerCodeChange(val) })


    /** @description  */
    const handlePresetModeName = () => {
      if (props.options.mode == 'fclog' || props.options.mode == "log") {
        presetModeName.value = "FcLog"
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
      containerWidth,
      containerHeight,
      instanceName: props.name || internalInstance?.parent?.type?.name + '-cm',
      presetRef,
    }
  },

})
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
      const currentVal = cm.getValue()
      if (currentVal == content.value) return
      content.value = currentVal
      ctx.emit('update:value', content.value)
      ctx.emit('input', content.value)
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
