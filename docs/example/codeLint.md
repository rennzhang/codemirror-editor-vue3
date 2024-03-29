---
aside: false
---

# 代码语法检查
::: tip
Here are some examples of code syntax checking, currently supported for js, json, etc.

Click on the blue font below to see the effect.
:::


<component v-if="CaseContainer" :is="CaseContainer"></component>

<script>
import { shallowRef } from "vue"

export default {
  data() {
    return {
      CaseContainer: null,
    }
  },

  mounted() {
    import('../demo/examples/lint/index.vue').then((module) => {
      this.CaseContainer = shallowRef(module.default)
    })

  }
}
</script>
