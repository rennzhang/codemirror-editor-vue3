module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "./.eslintrc-auto-import.json",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "import"],
  rules: {
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
    "@typescript-eslint/no-explicit-any": ["off"],
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
