/*******************************************************************************
 * @Author                : <>                                                 *
 * @CreatedDate           : 2026-05-27 12:47:56                                *
 * @LastEditors           : <>                                                 *
 * @LastEditDate          : 2026-06-13 12:24:49                                *
 * @FilePath              : docs-web/eslint.config.js                          *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginVue from 'eslint-plugin-vue'

import pluginQuasar from '@quasar/app-vite/eslint'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

export default [
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    ignores: ['*.json', 'node_modules/**', '.quasar/**', 'dist/**'],
  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  ...pluginVue.configs['flat/essential'],

  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    rules: {
      'prefer-promise-reject-errors': 'off',
      'vue/multi-word-component-names': 'off',
      'import/no-unresolved': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION', // is / v-is
            'LIST_RENDERING', // v-for
            'CONDITIONALS', // v-if / v-else-if / v-else / v-show / v-cloak
            'RENDER_MODIFIERS', // v-once / v-pre
            'GLOBAL', // id
            'UNIQUE', // ref / key
            'TWO_WAY_BINDING', // v-model
            'OTHER_DIRECTIVES',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_STATIC',
            'ATTR_DYNAMIC',
            'EVENTS',
            'CONTENT', // v-html / v-text
          ],
          alphabetical: false,
          sortLineLength: true,
        },
      ],
      // Import sorting rules
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '{eslint-plugin-*,@eslint/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '#q-app',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  {
    files: ['src-pwa/sw/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
]
