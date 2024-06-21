import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import { contactLoader } from '~/modules/contacts';

import { AppLayout } from '~/components/templates';

import App from '~/App';

import { RootErrorBoundary } from './RootErrorBoundary';

const queryClient = new QueryClient();

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <RootErrorBoundary />,
      children: [
        {
          path: '/',
          element: <App />,
        },
        {
          path: '/contacts',
          lazy: () =>
            import('~/modules/contacts').then(({ Contacts }) => ({
              Component: Contacts,
              // You can lazy load additional route props from the imported file, e.g.
              // loader: contactsLoader
            })),
          errorElement: (
            <div>Something went wrong with rendering the Contacts route</div>
          ),
          children: [
            {
              path: ':contactId',
              lazy: () =>
                import('~/modules/contacts').then(({ Contact }) => ({
                  Component: Contact,
                  // You can lazy load additional route props from the imported file, e.g.
                  // loader: contactLoader
                })),
              loader: contactLoader(queryClient),
              errorElement: (
                <div>
                  Something went wrong with rendering the Contact details route
                </div>
              ),
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
