import { memo } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import LoginForm from "../login-form";
import PropTypes from 'prop-types';
import ProfilePage from "../profile-page";


function LoginPage({ title, data, onLogin, error, isAuthorized, t }) {
  const cn = bem('LoginPage');
  return (
    <div className={cn()}>
      <div className={cn("head")}>{title}</div>
      {isAuthorized ? <ProfilePage data={data} t={t} /> : <LoginForm onLogin={onLogin} error={error} t={t} />}
    </div>
  )
};

LoginPage.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  onLogin: PropTypes.func,
  isAuthorized: PropTypes.bool,
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
