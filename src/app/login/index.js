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
import { useNavigate } from 'react-router-dom';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    waiting: state.user.waiting,
    error: state.user.error,
    token: state.user.token,
    isAuthorized: state.user.isAuthorized,
  }));
  const { t } = useTranslate();

  const callbacks = {
    handleLogin: useCallback((e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const { login, password } = Object.fromEntries(form);
      store.actions.user.fetchLogin({ login, password });
    }, [store]),
    checkToken: useCallback(() => store.actions.user.checkToken(), [store])
  }
  useInit(() => {
    if (select.isAuthorized) navigate(-1)
  }, [select.isAuthorized], true);

  return (
    <PageLayout>
      <HeadProfileBlock />
      <Head title={"Магазин"}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginPage
          title={t("profile.entry")}
          isAuthorized={select.isAuthorized}
          onLogin={callbacks.handleLogin}
          error={select.error}
          t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
