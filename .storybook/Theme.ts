import { create } from '@storybook/theming/create';

import Logo from './logo.svg';

export default create({
  base: 'dark',
  brandTitle: 'My Storybook',
  brandUrl: 'https://my-homepage.com',
  brandImage: Logo,
  brandTarget: '_self',
});
