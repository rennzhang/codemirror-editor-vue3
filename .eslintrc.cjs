module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "./.eslintrc-auto-import.json",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "linebreak-style": 0, // 	强制使用一致的换行风格
    "max-len": 0, // 强制一行的最大长度
    // // Prettier
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: true,
        trailingComma: "es5",
      },
    ],
    // Vue
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    quotes: ["error", "double"],
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-restricted-syntax": "off",
    "no-unused-expressions": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
    // "vue/multi-word-component-names": "off",
    // "@typescript-eslint/no-explicit-any": ["off"],
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
