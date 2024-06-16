/*
 * See https://github.com/i18next/i18next-scanner#default-options for options
 */

const sha1 = require('sha1');
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  options: {
    func: {
      extensions: ['.js', '.jsx'],
      list: ['i18n.t', 't'],
    },
    trans: {
      component: 'Trans',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (ns, value) {
        // Returns a hash value as the fallback key
        return sha1(value);
      },
      i18nKey: 'i18nKey',
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    lngs: ['de', 'en'],
    defaultLng: 'de',
    ns: ['frontend'],
    defaultNs: 'frontend',
    nsSeparator: false,
    keySeparator: false,
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      jsonIndent: 2,
      lineEnding: '\n',
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
    },
    removeUnusedKeys: true,
    sort: true,
    debug: false,
  },
  transform: typescriptTransform({ extensions: ['.ts', '.tsx'] }),
  output: 'public',
};
