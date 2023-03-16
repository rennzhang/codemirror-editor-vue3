---
layout: home

title: codemirror-editor-vue3
titleTemplate: codemirror-editor-vue3

hero:
  name: codemirror-editor-vue3
  tagline: CodeMirror 的 vue3 组件, 开箱即用.
  actions:
    - theme: brand
      text: 入门指南
      link: /zh-CN/guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/RennCheung/codemirror-editor-vue3
---

<component v-if="dynamicComponent" :is="dynamicComponent"></component>

<script >
import {shallowRef} from "vue"
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('../demo/home.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>
