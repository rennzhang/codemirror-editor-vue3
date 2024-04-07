---
aside: false
---

# 交互案例

::: tip
通过下面的各项配置，你可以得到丰富的案例

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
    import('../../demo/examples/Interactive/index.vue').then((module) => {
      this.CaseContainer = shallowRef(module.default)
    })

  }
}
</script>
