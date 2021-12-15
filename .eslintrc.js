/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

function parseAutoImportsDts(contents) {
  const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm);
  return Array.from(matchResults, ([, word]) => word);
}

function uiPackageAutoImportGlobals() {
  const SRC = path.resolve(__dirname, "./types/auto-imports.d.ts");

  const contents = fs.readFileSync(SRC, { encoding: "utf-8" });
  const parsed = parseAutoImportsDts(contents);
  return parsed.reduce((acc, word) => {
    acc[word] = "readonly";
    return acc;
  }, {});
}
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020, // 支持的ES语法版本
    sourceType: "module",
    ecmaFeatures: { jsx: true }, // 启用 JSX
    parser: "@typescript-eslint/parser",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    ...uiPackageAutoImportGlobals(),
  },
  plugins: ["@typescript-eslint", "prettier", "import", "vue"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      rules: {
        // "no-undef": "off",
      },
    },
  ],
  rules: {
    "prettier/prettier": ["error", {}],
    // 关闭===代替==的告警
    eqeqeq: "off",
    "linebreak-style": "off", // 关闭规则：使用一致的换行风格
    // 默认使用双引
    quotes: ["error", "double", "avoid-escape"],
    // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    "for-direction": "error",
    // 禁用 console
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 禁用 console
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 不允许末尾逗号
    "comma-dangle": ["error", "always-multiline"], // 当最后一个元素或属性与闭括号 ] 或 } 在不同的行时，要求使用拖尾逗号；当在同一行时，禁止使用拖尾逗号

    // 可以出现未使用的表达式，如：a && a();
    "no-unused-expressions": "off",
    // 此规则不允许在标识符中使用下划线。
    "no-underscore-dangle": "off",
    // 禁止出现多行空行
    "no-multiple-empty-lines": [
      1,
      {
        max: 2,
      },
    ],
    // vue组件模板顺序
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
    // "import/no-unresolved": "off",
    // "import/extensions": "off",
    "import/no-absolute-path": "off",
    "no-shadow": "off",
    "import/no-extraneous-dependencies": "off",
    "vue/no-multiple-template-root": "off",
    "vue/singleline-html-element-content-newline": "off",
    // 关闭 vue html的换行规则
    "vue/max-attributes-per-line": "off",
    // 关闭在  esMoudle js 文件中，必须导出 default 的规则
    "import/prefer-default-export": "off",
    "no-plusplus": "off", // 可以使用++和--
    "no-continue": "off", // 可以使用continue
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "vue/script-setup-uses-vars": "error",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
