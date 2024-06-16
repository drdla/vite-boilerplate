import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import tsconfigPaths from 'vite-tsconfig-paths';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import webfontDownload from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: browserslistToEsbuild(),
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
  plugins: [
    tsconfigPaths(),
    react(),
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
          description:
            'Refresh the page to get the latest version of this app.',
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
  ],
  resolve: {
    alias: {
      '~/*': './src/*',
    },
  },
});