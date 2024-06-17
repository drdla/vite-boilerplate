import viteLogo from '/vite.svg';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';

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

      <h1>{t('This is an internationalized text!')}</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('count is {{count}}', { count })}
        </button>
        <p>
          <Trans i18nKey="app.editAppToTestHMR">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="text-2xl text-red-500">
        {t('Click on the Vite and React logos to learn more')}
      </p>
    </>
  );
}

export default App;
