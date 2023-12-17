import { memo } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import InputField from "../input-field";

function LoginPage({ title, onLogin, error, t }) {
  const cn = bem('LoginPage');
  return (
    <div className={cn()}>
      <div className={cn("head")}>{title}</div>
      <form className={cn("form")} onSubmit={onLogin}>
        <InputField label={t("profile.login")} type={"text"} name="login" defaultValue={"test_1"} />
        <InputField label={t("profile.password")} type={"password"} name="password" />
        <button className={cn("button")} type="submit">{t("profile.enter")}</button>
      </form>
      {error?.message && <div className={cn("error")}>{error?.message}</div>}
    </div>
  )
};

LoginPage.propTypes = {
  title: PropTypes.string,
  onLogin: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  t: PropTypes.func
};

LoginPage.defaultProps = {
  t: (text) => text,
  error: {
    message: ""
  }
};

export default memo(LoginPage);
