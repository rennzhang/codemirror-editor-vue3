module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended", // 添加 prettier 插件
    "./.eslintrc-auto-import.json"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "prettier", "@typescript-eslint", "import"],
  rules: {
    semi: ["off"], // 要求或禁止使用分号代替 ASI
    quotes: ["error", "double", "avoid-escape"],
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-restricted-syntax": "off",
    "no-unused-expressions": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "no-undef": "off"
      }
    }
  ]
};
