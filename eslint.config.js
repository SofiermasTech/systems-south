import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Добавляем Node.js глобальные переменные (если нужно для серверных скриптов)
      },
      parserOptions: {
        ecmaVersion: 'latest', // Поддержка новейших возможностей JS
        sourceType: 'module', // Используем ES Modules
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'], // Используем пресет для Vue 3
  skipFormatting,
  {
    rules: {
      // Дополнительные правила для Vue
      'vue/order-in-components': ['error', {
        order: [
          'name',
          'components',
          'props',
          'emits',
          'data',
          'computed',
          'watch',
          'methods',
          ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted'],
        ],
      }],
      'vue/no-unused-vars': 'error', // Проверять неиспользуемые переменные в шаблонах
      'vue/require-default-prop': 'error', // Требовать значения по умолчанию для пропсов
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always', // Теги вроде <img> должны быть самозакрывающимися
          normal: 'never', // Обычные теги не должны быть самозакрывающимися
          component: 'always', // Компоненты должны быть самозакрывающимися
        },
      }],
      // Отключение или настройка менее строгих правил
      'vue/no-v-html': 'off', // Разрешить использование v-html (если нужно)
      // Правила для JavaScript
      // 'no-console': ['warn', { allow: ['error'] }], // Предупреждать о console.log, но разрешать console.error
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Игнорировать переменные с префиксом _
    },
  },
];
