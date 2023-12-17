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
import LoginPage from '../../components/login-page';
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
    error: state.profile.error,
    token: state.profile.token,
    isAuthorized: state.profile.isAuthorized,
    data: state.profile?.profile,
  }));
  const { t } = useTranslate();

  const callbacks = {
    checkLogin: useCallback(() => store.actions.profile.checkLogin(), [store])
  }

  useInit(() => {
    callbacks.checkLogin();
    if (!select.isAuthorized) navigate("/login")
  }, [select.isAuthorized]);

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
