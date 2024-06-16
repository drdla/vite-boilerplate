import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
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
  plugins: [react()],
});
