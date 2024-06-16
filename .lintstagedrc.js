// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

import path from 'path';

const buildEslintCommand = (filenames) =>
  `lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  '*.{js,jsx,ts,tsx}': [
    'import-sort --write',
    buildEslintCommand,
    'prettier --write',
  ],
  '*.{js,jsx,ts,tsx,json,md}': ['prettier --write'],
};
