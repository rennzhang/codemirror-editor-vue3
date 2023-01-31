<template>
  <div class="demo-preview" :class="$props.name">
    <div v-if="$props.title" class="demo-preview-head">
      {{ $props.title }}
    </div>
    <div class="demo-preview-body">
      <slot><span>Loading...</span></slot>
    </div>
    <div class="demo-preview-control" @click="tiggerShowCode">
      <span class="tigger-show-code">
        <i
          class="iconfont control-icon"
          :class="showCode ? 'icon-caret-up' : 'icon-caret-down'"
        ></i>
        {{ showCode ? "hide code" : "show code" }}</span
      >
      <span class="copy" @click.stop="copy">{{
        copyStatus ? "Copied!" : "Copy"
      }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Default",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    name: {
      required: true,
      type: String,
      default: "",
    },
  },
  setup(props, { emit, attrs }) {
    const copyStatus = ref(false);
    const viewDom = ref(null);
    const showCode = ref(true);
    const demoContent = ref(null);
    const codeContent = ref(null);
    const tiggerShowCode = () => {
      showCode.value = !showCode.value;
      if (showCode.value) {
        viewDom.value.style.height = `${
          document.querySelector(`.language-vue.${props.name} pre`)
            .clientHeight + 2
        }px`;
        viewDom.value.style.borderTop = "1px solid #ddd";
        return;
      }
      viewDom.value.style.height = 0;
      viewDom.value.style.borderTop = 0;
    };

    const moveCodeContent = () => {
      demoContent.value = document.querySelector(`.demo-preview.${props.name}`);
      codeContent.value = document.querySelector(`.language-vue.${props.name}`);
      const demoControl = document.querySelector(
        `.demo-preview.${props.name} .demo-preview-control`
      );
      if (!demoContent.value.contains(codeContent.value)) {
        // demoContent.value?.insertBefore(codeContent.value, demoControl || '')
        demoControl.parentNode?.insertBefore(
          codeContent.value,
          demoControl || ""
        );
      }
    };

    const copy = () => {
      if (copyStatus.value) return;
      const type = "text/plain";
      const text = codeContent.value.innerText;
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data).then(
        function (e) {
          copyStatus.value = true;
          setTimeout(() => {
            copyStatus.value = false;
          }, 10000);
          /* success */
        },
        function (err) {
          copyStatus.value = false;
          /* failure */
        }
      );
    };
    onMounted(() => {
      viewDom.value = document.querySelector(`.language-vue.${props.name}`);
      moveCodeContent();
      tiggerShowCode();
    });

    return {
      copyStatus,
      showCode,
      tiggerShowCode,
      copy,
    };
  },
};
</script>

<style lang="less">
.iconfont {
  vertical-align: middle;
  margin-right: 3px;
}
.demo-preview {
  transition: 0.2s;
}
.demo-preview .language-vue {
  margin-top: 0;
  border-radius: 0;
  transition: height 0.2s;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #ddd;
  border-bottom: 0;
}
.demo-preview-head {
  border: 1px solid #ddd;
  padding: 10px;
  border-bottom: 0;

  // background: #f7f7f7;
}
.demo-preview-body {
  padding: 20px;
  min-height: 400px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .codemirror-container {
    box-shadow: 0px 0px 10px 5px #e8e8e8;
  }
}
.demo-preview-control {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  user-select: none;
  // border-top: none;
  color: #d3dce6;
  .tigger-show-code {
    padding: 0 10px;
    &:hover {
      color: #646cff;
    }
  }
  .copy {
    font-size: 12px;
    position: absolute;
    right: 10px;
    &:hover {
      color: #646cff;
    }
  }
}
</style>
