const nextPlugin = require("@next/eslint-plugin-next");

module.exports = [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...nextPlugin.configs["recommended"].rules,
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
    ],
  },
];
