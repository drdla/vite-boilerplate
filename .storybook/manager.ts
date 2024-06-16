import { addons } from '@storybook/manager-api';

import Theme from './Theme';

addons.setConfig({
  panelPosition: 'bottom',
  showToolbar: true,
  theme: Theme,
});
