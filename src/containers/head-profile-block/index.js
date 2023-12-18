import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { Link, useNavigate } from "react-router-dom";
import Controls from "../../components/controls";
import SideLayout from "../../components/side-layout";
import HeadProfile from "../../components/head-profile";

/**
 * Контейнер для перехода/выхода в/из личный кабинет
 */
function HeadProfileBlock() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuthorized: state.user.isAuthorized,
    profileName: state.user.username,
  }))

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
    onNavigate: useCallback(() => navigate("/login"), [store])
  }
  return (
    <HeadProfile
      isAuthorized={select.isAuthorized}
      onLogout={callbacks.onLogout}
      onNavigate={callbacks.onNavigate}
      profileName={select.profileName}
      t={t}
    />

  );
}

export default memo(HeadProfileBlock);
