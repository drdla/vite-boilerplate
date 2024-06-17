import '../src/index.css';

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

import Theme from './Theme';

const tailwindBreakpoints = {
  tailwindSm: {
    name: 'sm (Tailwind)',
    styles: {
      width: '640px',
      height: '999px',
    },
  },
  tailwindMd: {
    name: 'md (Tailwind)',
    styles: {
      width: '768px',
      height: '999px',
    },
  },
  tailwindLg: {
    name: 'lg (Tailwind)',
    styles: {
      width: '1024px',
      height: '999px',
    },
  },
  tailwindXl: {
    name: 'xl (Tailwind)',
    styles: {
      width: '1280px',
      height: '999px',
    },
  },
  tailwind2xl: {
    name: '2xl (Tailwind)',
    styles: {
      width: '1536px',
      height: '999px',
    },
  },
};

const preview: Preview = {
  decorators: [
    // @ts-expect-error // Add required Providers for i18n, router, auth, etc. here
    (Story) => <Story />,
  ],
  globalTypes: {
    locale: {
      description: 'i18n locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        right: 'i18n',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'de', right: '🇩🇪', title: 'Deutsch' },
        ],
      },
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#292929',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: Theme,
      toc: true,
    },
    layout: 'centered',
    options: {
      storySort: {
        method: 'alphabetical-by-kind',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...tailwindBreakpoints,
        // ...INITIAL_VIEWPORTS, // Long list of specific device viewports, e.g. iPhone6, Pixel 8, etc.
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
