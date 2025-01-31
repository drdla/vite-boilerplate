import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingIndicator } from '~/components/atoms';

export const AppLayout = memo(() => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="flex h-dvh flex-col">
        <main className="flex-1 container mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
});
