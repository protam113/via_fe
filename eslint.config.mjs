// eslint.config.mjs

import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const env = process.env.NODE_ENV || 'development';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Next.js & TypeScript recommended rules
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    // ✅ Xác định môi trường ngôn ngữ
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true, // Cho phép JSX
        },
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'no-console': [
        'error',
        {
          allow: env === 'development' ? ['log', 'warn', 'error'] : [],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off', // Need to check before production
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/no-default-export': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
