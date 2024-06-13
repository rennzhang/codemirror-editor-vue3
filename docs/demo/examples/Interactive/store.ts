import { useData } from "vitepress";
import { LANG_OPTIONS, DEFAULT_LANG_OPT } from "./config/langOptions";
import { reactive, watch, nextTick, onMounted } from "vue";
export const store = reactive({
  height: "400px",
  width: "100%",
  lineHeight: "20px",
  fontSize: "13px",
  border: true,
  readOnly: false,
  theme: "default",
  themePath: "",
  lang: DEFAULT_LANG_OPT.value,
  langPath: DEFAULT_LANG_OPT.langPath,
  code: DEFAULT_LANG_OPT.code,
});

export const useStore = () => {
  const { isDark } = useData();

  watch(
    isDark,
    (val) => {
      store.theme = val ? "dracula" : "default";
      store.themePath = val ? "codemirror/theme/dracula.css" : "";
    },
    { immediate: true, deep: true }
  );

  watch(
    () => store.lang,
    (val) => {
      const langOpt = LANG_OPTIONS.find((opt) => opt.value === val);
      if (langOpt) {
        store.langPath = langOpt.langPath;
        store.code = langOpt.code;
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    // 读取 url 中的 lang参数
    const url = new URL(window.location.href);
    const lang = url.searchParams.get("lang");
    if (lang) {
      const langOpt = LANG_OPTIONS.find((opt) => opt.label === lang);
      if (langOpt) {
        store.lang = langOpt.value;
      }
    }
    console.log("url lang", lang, store);
  });
  return store;
};

export default store;
