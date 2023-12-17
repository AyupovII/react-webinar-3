import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { Link, useNavigate } from "react-router-dom";
import Controls from "../../components/controls";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер для перехода/выхода в/из личный кабинет
 */
function HeadProfileBlock() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized,
    profileName: state.profile.username,
  }))

  const callbacks = {
    onLogout: useCallback(() => store.actions.profile.logout(), [store]),
    onNavigate: useCallback(() => navigate("/login"), [store])
  }
  return (
    <div className='HeadProfile'>
      {select.isAuthorized ?
        <SideLayout padding='small' side={"end"}>
          <Link to={"/profile"}>{select.profileName}</Link>
          <Controls title={"Выход"} onHandler={callbacks.onLogout} />
        </SideLayout>
        :
        <Controls title={"Вход"} onHandler={callbacks.onNavigate} />
      }
    </div>
  );
}

export default memo(HeadProfileBlock);
