import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import InputField from "../input-field";


function LoginForm({ t, error, onLogin }) {

  const cn = bem('LoginForm');
  return (
    <>
      <form className={cn("form")} onSubmit={onLogin}>
        <InputField label={t("profile.login")} type={"text"} name="login" defaultValue={"test_1"} />
        <InputField label={t("profile.password")} type={"password"} name="password" />
        <button className={cn("button")} type="submit">{t("profile.enter")}</button>
      </form>
      {error?.message && <div className={cn("error")}>{error?.message}</div>}
    </>
  )
};

LoginForm.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  t: PropTypes.func,
  onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  t: (text) => text,
  onLogin: ()=>{},
  error: {
    message: ""
  }
};

export default memo(LoginForm);
