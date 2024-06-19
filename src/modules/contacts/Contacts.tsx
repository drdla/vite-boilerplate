import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const Contacts = () => {
  const { t } = useTranslation('frontend');

  return (
    <div>
      {t('contacts')}
      <Outlet />
    </div>
  );
};

export default Contacts;
