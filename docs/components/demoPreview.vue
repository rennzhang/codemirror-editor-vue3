<template>
  <div class="demo-preview" :class="$props.name">
    <div class="demo-preview-head">
      {{ $props.title }}
    </div>
    <div class="demo-preview-body">
      <slot>fadjflkjadklfjldasjfklada</slot>
    </div>
    <div class="demo-preview-control" @click="tiggerShowCode">
      <span class="tigger-show-code">
        <i
          class="iconfont control-icon"
          :class="showCode ? 'icon-caret-up' : 'icon-caret-down'"
        ></i>
        {{ showCode ? "hide code" : "show code" }}</span
      >
      <span class="copy" @click.stop="copy">复制代码</span>
    </div>
  </div>
</template>

<script>
import Message from 'ant-design-vue/lib/message';
import 'ant-design-vue/lib/message/style/index.css'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件
import { ref, onMounted } from "vue"
export default {
  name: "default",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      required: true,
      type: String,
      default: ""
    },
  },
  setup(props, { emit, attrs }) {
    const viewDom = ref(null)
    const showCode = ref(true)
    const demoContent = ref(null)
    const codeContent = ref(null)
    let height = ref(0)
    const tiggerShowCode = () => {
      showCode.value = !showCode.value
      if (showCode.value) {
        viewDom.value.style.height = height.value + 'px'
        viewDom.value.style.borderTop = "1px solid #ddd"
        return
      }
      viewDom.value.style.height = 0
      viewDom.value.style.borderTop = 0
    };

    const moveCodeContent = () => {
      demoContent.value = document.querySelector(`.demo-preview.${props.name}`)
      codeContent.value = document.querySelector(`.language-vue.${props.name}`)
      let demoControl = document.querySelector(".demo-preview-control")
      demoContent.value.insertBefore(codeContent.value, demoControl)
    }

    const copy = () => {
      var type = "text/plain";
      let text = codeContent.value.innerText;
      var blob = new Blob([text], { type });
      var data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data).then(
        function (e) {
          Message.success("复制成功！")
          console.log(e);
          /* success */
        },
        function (err) {
          console.log(err);
          /* failure */
        }
      );
    }
    onMounted(() => {
      viewDom.value = document.querySelector(`.language-vue.${props.name}`)
      height.value = viewDom.value.clientHeight
      moveCodeContent()
      tiggerShowCode()
    })

    return {
      showCode,
      tiggerShowCode,
      copy
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
  overflow: hidden;
  margin: 0;
  border: 1px solid #ddd;
  border-bottom: 0;
  // border-top: 0;
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
