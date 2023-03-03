---
layout: home

title: codemirror-editor-vue3
titleTemplate: codemirror-editor-vue3

hero:
  name: codemirror-editor-vue3
  tagline: CodeMirror component for Vue3, very easy to use codeMirror.
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
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
    import('../views/demo/home.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>
