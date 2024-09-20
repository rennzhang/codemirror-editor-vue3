---
aside: false
---

# 代码语法检查

::: tip下面是一些代码语法检查的案例，目前支持 js、json等。

可以点击下面蓝色字体查看效果 :::

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
    import('../../demo/examples/lint/index.vue').then((module) => {
      this.CaseContainer = shallowRef(module.default)
    })

  }
}
</script>
