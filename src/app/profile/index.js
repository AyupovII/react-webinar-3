import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import HeadProfileBlock from '../../containers/head-profile-block';
import ProfilePage from '../../components/profile-page';
import { useNavigate } from 'react-router-dom';

/**
 * Страница пользователя
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate();


  const select = useSelector(state => ({
    waiting: state.profile.waiting,
    token: state.user.token,
    isAuthorized: state.user.isAuthorized,
    data: state.profile?.profile,
  }));
  const { t } = useTranslate();
  const callbacks = {
    loadProfile: useCallback(() => store.actions.profile.loadProfile(), [store])
  }

  useInit(() => {
    callbacks.loadProfile();
    if (!select.isAuthorized) navigate("/login")
  }, [select.isAuthorized], true);

  return (
    <PageLayout>
      <HeadProfileBlock />
      <Head title={"Магазин"}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
          <ProfilePage data={select.data} title={t("profile.profile")} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
