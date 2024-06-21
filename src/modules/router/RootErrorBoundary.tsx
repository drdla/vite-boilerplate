import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

/**
 * Renders an error boundary component at the root level of the router.
 * Errors bubble up in react-router-dom and are handled by this error boundary
 * if a route does not have its own error element.
 * @see https://reactrouter.com/en/main/route/error-element
 *
 * @return {JSX.Element} The rendered error boundary component.
 */
export const RootErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  if (!isRouteErrorResponse(error)) {
    return <div>{t('error.generic.title')}</div>;
  }

  if (error.status === 404) {
    return <div>{t('error.404.title')}</div>;
  }

  if (error.status === 401) {
    return <div>{t('error.401.title')}</div>;
  }

  if (error.status === 503) {
    return <div>{t('error.503.title')}</div>;
  }
};
