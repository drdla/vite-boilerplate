import viteLogo from '/vite.svg';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  const { t } = useTranslation('frontend');

  // Set locale for update notice somewhere.
  // window.pluginWebUpdateNotice_.setLocale('de_DE');

  return (
    <>
      <Helmet>
        <title>{t('app.metaTitle')}</title>
        <meta name="description" content={t('app.metaDescription')} />
      </Helmet>

      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="" alt="Vite logo" />
        </a>
      </div>

      <h1>{t('app.i18nExample')}</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('app.counterValue', { count })}
        </button>
        <p>
          <Trans i18nKey="app.editAppToTestHMR">
            Edit <i>src/App.tsx</i> and save to test HMR
          </Trans>
        </p>
      </div>
      <Outlet />
    </>
  );
}

export default App;
