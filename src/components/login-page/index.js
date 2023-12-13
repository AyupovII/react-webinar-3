import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Input from "../input";
import { cn as bem } from '@bem-react/classname';
import InputField from "../input-field";
import Head from "../head";


function LoginPage() {
  const cn = bem('LoginPage');
  return (
    <div className={cn()}>
      <div className={cn("Head")}>Вход</div>
      <InputField label={"Логин"} type={"text"} />
      <InputField label={"Пароль"} type={"password"} />
      <button className={cn("Button")}>Войти</button>
    </div>
  )
}

export default memo(LoginPage);
