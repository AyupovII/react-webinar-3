import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import HeadProfile from "../../components/head-profile";
import { useNavigate } from "react-router-dom";

/**
 * Контейнер для перехода/выхода в/из личный кабинет
 */
function HeadProfileBlock() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();
  
  const select = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized,
    profileName: state.profile.username,
  }))

  const callbacks = {
    onNavigateToLogin: () => navigate("/login"),
    onLogout: useCallback(() => store.actions.profile.logout(), [store])
  }
  return (
    <HeadProfile
      title={select.isAuthorized ? t("profile.exit") : t("profile.entry")}
      onHandler={select.isAuthorized ? callbacks.onLogout : callbacks.onNavigateToLogin}
      isAuthorized={select.isAuthorized}
      profileName={select.profileName}
      link={"/login"}
    />
  );
}

export default memo(HeadProfileBlock);
