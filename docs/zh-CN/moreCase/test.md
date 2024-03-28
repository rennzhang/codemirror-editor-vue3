# Log mode

Based on the log modes derived from services, there are common log modes and custom log modes, as follows:


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
    import('../demo/moreCase/index.vue').then((module) => {
      this.CaseContainer = shallowRef(module.default)
    })

  }
}
</script>
