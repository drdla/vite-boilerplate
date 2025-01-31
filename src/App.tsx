import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

function App() {
  const { t } = useTranslation('frontend');

  // Set locale for update notice somewhere.
  // window.pluginWebUpdateNotice_.setLocale('de_DE');

  return (
    <>
      <Helmet>
        <title>Contacts Dashboard</title>
        <meta
          name="description"
          content="Manage your contacts with ease."
        />
      </Helmet>

      <div className="flex min-h-dvh flex-col items-center justify-center ">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Contacts Dashboard
          </h1>
          <p className="mb-8 text-lg text-gray-600">
          Manage your contacts with ease.
          </p>
          <Link
            to="/contacts"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Contacts
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default App;
