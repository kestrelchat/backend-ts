import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import licenseHeader from 'eslint-plugin-license-header';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const currentYear = new Date().getFullYear();

export default [
  {
    files: ['src/**/*.{ts,js}'],
    ignores: ['dist/*', 'node_modules/*', 'tests/*', '.cache/*'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    files: ['src/**/*.{ts,js}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'license-header': licenseHeader,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-process-exit': 'warn',

      'license-header/header': [
        'error',
        [
          '/*',
          ' * Kestrel - a lightweight real-time messaging service',
          ` * Copyright (C) ${currentYear} Kestrel Chat`,
          ' *',
          ' * This program is free software: you can redistribute it and/or modify',
          ' * it under the terms of the GNU Affero General Public License as published',
          ' * by the Free Software Foundation, either version 3 of the License, or',
          ' * (at your option) any later version.',
          ' *',
          ' * This program is distributed in the hope that it will be useful,',
          ' * but WITHOUT ANY WARRANTY; without even the implied warranty of',
          ' * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the',
          ' * GNU Affero General Public License for more details.',
          ' *',
          ' * You should have received a copy of the GNU Affero General Public License',
          ' * along with this program. If not, see <https://www.gnu.org/licenses/>.',
          ' */',
        ],
      ],
    },
  },
];
