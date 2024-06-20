import { memo } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = memo(() => {
  return (
    <div>
      <Outlet />
    </div>
  );
});
