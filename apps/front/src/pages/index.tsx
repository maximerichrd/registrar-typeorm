import { serverSideTranslations } from '@demo/front/shared/i18n/serverSideTranslations';
import { useTranslation } from '@demo/front/shared/i18n/useTranslation';
import type { GetStaticProps } from '@demo/front/shared/next';

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? defaultLocale,
        /* TODO: Home domain */
        ['home', 'common']
      )),
    },
  };
};

function HomePage() {
  const { t } = useTranslation('home');
  return <h1 className="text-3xl font-bold underline">{t('home:title')}</h1>;
}

export default HomePage;
