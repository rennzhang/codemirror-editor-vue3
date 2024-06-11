import { useData } from "vitepress";
import { LANG_OPTIONS, DEFAULT_LANG_OPT } from "./config/langOptions";
import { reactive, watch, nextTick } from "vue";
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
  return store;
};

export default store;
