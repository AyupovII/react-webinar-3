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
        <SideLayout side={"end"} style={{ height: `41px`, borderBottom: `1px solid #DCDCDC`, margin: "0" }}>
          <Link to={"/profile"}>{profileName}</Link>
          <Controls title={"Выход"} onHandler={onLogout} />
        </SideLayout>
        :
        <SideLayout side={"end"} style={{ height: `41px`, borderBottom: `1px solid #DCDCDC`, margin: "0" }}>
          <Controls title={"Вход"} onHandler={onNavigate} />
        </SideLayout>
      }
    </div>
  )
}

HeadProfile.propTypes = {
  onLogout: PropTypes.func,
  onNavigate: PropTypes.func,
  isAuthorized: PropTypes.bool,
  profileName: PropTypes.string,
  t: PropTypes.func,
  style: PropTypes.object
};

HeadProfile.defaultProps = {
  onLogout: () => {
  },
  onNavigate: () => {
  },
  t: (text) => text,
}

export default memo(HeadProfile);
