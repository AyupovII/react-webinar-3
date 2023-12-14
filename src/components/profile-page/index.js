import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';


function ProfilePage({ t, data }) {
  const cn = bem('ProfilePage');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("profile.name")}: </div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("profile.phone")}: </div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("profile.email")}: </div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  )
};

ProfilePage.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func
};

ProfilePage.defaultProps = {
  t: (text) => text,
};

export default memo(ProfilePage);
