<template>
  <div class="demo-preview">
    <div class="demo-preview-head">
      {{ $props.title }}
    </div>
    <div class="demo-preview-body">
      <slot>fadjflkjadklfjldasjfklada</slot>
    </div>
    <div class="demo-preview-footer" @click="tiggerShowCode">
      <span>{{ showCode ? "hide code" : "show code" }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
export default {
  name: "default",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, attrs }) {
    const viewDom = ref(null)
    const showCode = ref(false)

    const tiggerShowCode = () => {
      showCode.value = !showCode.value
      viewDom.value.style.display = showCode.value ? 'block' : 'none'
    };

    onMounted(() => {
      viewDom.value = document.querySelector('.' + attrs.viewClass)
      viewDom.value.style.display = 'none'
    })

    return {
      showCode,
      tiggerShowCode
    };
  },
};
</script>

<style lang="less">
.demo-preview + .language-vue {
  margin-top: 0;
  border-radius: 0;
}
.demo-preview-head {
  border: 1px solid #ddd;
  padding: 10px;
  // background: #f7f7f7;
}
.demo-preview-body {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom: 0;
}
.demo-preview-footer {
  width: 100%;
  display: inline-block;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;
  user-select: none;
  // border-top: none;
  color: #b3b3b3;
  &:hover {
    color: #393939;
  }
}
</style>
