// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

import path from 'path';

const buildEslintCommand = (filePaths) =>
  `eslint --fix --quiet --file ${filePaths.map((filePath) => path.relative(process.cwd(), filePath)).join(' --file ')}`;

export default {
  '*.{js,jsx,ts,tsx}': [
    'import-sort --write',
    buildEslintCommand,
    'i18next-scanner --config i18next-scanner.config.cjs',
    'i18next-resources-for-ts interface -i ./public/locales/en -o ./src/typings/i18n-resources.d.ts',
  ],
  '*.{js,cjs,mjs,jsx,ts,tsx,json,md}': ['prettier --write'],
  '*.{css}': ['stylelint --fix'],
};
