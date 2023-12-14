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

/**
 * Страница пользователя
 */
function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
    error: state.profile.error,
    token: state.profile.token,
    isAuthorized: state.profile.isAuthorized,
    data: state.profile?.profile,
  }));
  const { t } = useTranslate();

  const callbacks = {
    handleLogin: useCallback((e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const { login, password } = Object.fromEntries(form);
      store.actions.profile.fetchLogin({ login, password });
    }, [store]),
    checkLogin: useCallback(() => store.actions.profile.checkLogin(), [store])
  }

  useInit(() => {
    callbacks.checkLogin();
  }, []);

  return (
    <PageLayout>
      <HeadProfileBlock />
      <Head title={"Магазин"}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginPage 
        title={select.isAuthorized ? t("profile.entry") : t("profile.profile")} 
        data ={select.data} 
        isAuthorized = {select.isAuthorized} 
        onLogin={callbacks.handleLogin} 
        error={select.error} 
        t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
