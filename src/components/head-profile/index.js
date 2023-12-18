import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";
import Controls from "../controls";
import SideLayout from "../side-layout";

function HeadProfile({ isAuthorized, onLogout, onNavigate, profileName }) {
  return (
    <div className='HeadProfile'>
      {isAuthorized ?
        <SideLayout side={"end"} style={{height: `41px`, borderBottom: `1px solid #DCDCDC`}}>
          <Link to={"/profile"}>{profileName}</Link>
          <Controls title={"Выход"} onHandler={onLogout} />
        </SideLayout>
        :
        <Controls title={"Вход"} onHandler={onNavigate} />
      }
    </div>
  )
}

HeadProfile.propTypes = {
  onLogout: PropTypes.func,
  onNavigate: PropTypes.func,
  isAuthorized: PropTypes.bool,
  profileName: PropTypes.string,
  t: PropTypes.func
};

HeadProfile.defaultProps = {
  onLogout: () => {
  },
  onNavigate: () => {
  },
  t: (text) => text
}

export default memo(HeadProfile);
