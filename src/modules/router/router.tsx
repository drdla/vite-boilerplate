import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import { contactLoader } from '~/modules/contacts';

import App from '~/App';
import Contact from '~/modules/contacts/Contact';
import Contacts from '~/modules/contacts/Contacts';

const queryClient = new QueryClient();

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'contacts',
          // lazy: () => import('~/modules/contacts/Contacts'),
          element: <Contacts />,
          errorElement: (
            <div>Something went wrong with rendering the Contacts route</div>
          ),
          children: [
            {
              path: ':contactId',
              // lazy: () => import('~/modules/contacts/Contact'),
              element: <Contact />,
              errorElement: (
                <div>
                  Something went wrong with rendering the Contact details route
                </div>
              ),
              loader: contactLoader(queryClient),
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      // opt in to future changes to ease migration
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_prependBasename: true,
      v7_relativeSplatPath: true,
      unstable_skipActionErrorRevalidation: true,
    },
  },
);
