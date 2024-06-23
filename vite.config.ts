/*
 * This file configures Vite.
 * For performance reasons, Lightning CSS is used as the CSS preprocessor.
 * Also Million lint and Million compiler are used to optimize performance.
 * @see https://vitejs.dev/config/
 * @see https://million.dev/
 * @see https://lightningcss.dev/
 */

/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import istanbul from 'vite-plugin-istanbul';
import million from 'million/compiler';
import MillionLint from '@million/lint';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import webfontDownload from 'vite-plugin-webfont-dl';

const _plugins = [
  tsconfigPaths(),
  react(),
  istanbul({
    include: ['src/**/*'], // files to track coverage on
    exclude: ['node_modules'], // files to NOT track coverage on
    requireEnv: false,
  }),
  webfontDownload(),
  webUpdateNotice({
    notificationProps: {
      title: 'A new release is available',
      description: 'Refresh the page to get the latest version of this app.',
      buttonText: 'Refresh',
    },
    locale: 'de_DE',
    localeData: {
      en_US: {
        title: 'New Release Available',
        description: 'Refresh the page to get the latest version of this app.',
        buttonText: 'Refresh',
        dismissButtonText: 'Dismiss',
      },
      de_DE: {
        title: 'Neue Version verfügbar',
        description:
          'Aktualisiere die Seite, um die aktuelle Version der App zu laden.',
        buttonText: 'Aktualisieren',
        dismissButtonText: 'Ignorieren',
      },
    },
    hiddenDismissButton: true,
    logVersion: true,
  }),
];
// Use Million compiler to speed up React app.
_plugins.unshift(million.vite({ auto: true }));
// Use Million Lint to diagnose performance. N.B: this plugin must be at beginning of the plugin list!
_plugins.unshift(MillionLint.vite());

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    sourcemap: true,
    target: browserslistToEsbuild(),
  },
  css: {
    // transformer: 'lightningcss', // TODO: Enable once Tailwind supports Lightning CSS, which will be version 3.5 or later, see https://github.com/tailwindlabs/tailwindcss/discussions/11040#discussioncomment-7968401
  },
  esbuild: {
    /**
     * Prevents ESBuild to throw when using a feature not supported by the
     * list of supported browsers coming from the `browserslist` file.
     */
    supported: {
      'top-level-await': true,
    },
  },
  plugins: _plugins,
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.*'],
    // Only run files with .test. in their name
    coverage: {
      provider: 'istanbul',
    },
  },
});
