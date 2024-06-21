import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingIndicator } from '~/components/atoms';

export const AppLayout = memo(() => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Outlet />
    </Suspense>
  );
});
