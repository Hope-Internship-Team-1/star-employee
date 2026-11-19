import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Rule 1: no Chinese characters in the code
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/[\\u4e00-\\u9fff]/]',
          message: 'No Chinese characters in code. Use the EN/ID language packs.',
        },
        {
          selector: 'JSXText[value=/[\\u4e00-\\u9fff]/]',
          message: 'No Chinese characters in code. Use the EN/ID language packs.',
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
