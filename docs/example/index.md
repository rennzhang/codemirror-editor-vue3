---
aside: false
---

# Example

More cases are being updated...

# Interactive Example

::: tip
You can get rich examples through the following configurations.

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
    import('../demo/examples/Interactive/index.vue').then((module) => {
      this.CaseContainer = shallowRef(module.default)
    })

  }
}
</script>
