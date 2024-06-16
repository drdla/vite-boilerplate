import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: [
    // The order of this list controls the sorting in the toolbar
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-mdx-gfm',
  ],
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  docs: {},
};

export default config;
