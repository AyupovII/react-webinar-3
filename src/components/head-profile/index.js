import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function HeadProfile({ onHandler, title, isAuthorized, profileName, link }) {
  return (
    <div className='HeadProfile'>
      {isAuthorized && <div className="HeadProfile-link"><Link to={link}>{profileName}</Link></div>}
      <button onClick={onHandler}>
        {title}
      </button>
    </div>
  )
};

HeadProfile.propTypes = {
  onHandler: PropTypes.func,
  title: PropTypes.string,
  isAuthorized: PropTypes.bool,
  profileName: PropTypes.string,
  link: PropTypes.string
}; 

HeadProfile.defaultProps = {
  onHandler: () => {
  },
  t: (text) => text,
};

export default memo(HeadProfile);
