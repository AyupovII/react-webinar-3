import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onHandler , title, style}) {
  return (
    <div className='Controls' style={style}>
      <button onClick={() => onHandler ()}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  onHandler : PropTypes.func,
  title: PropTypes.string,
};

Controls.defaultProps = {
  onHandler : () => {
  },
  title: "Добавить"
}

export default memo(Controls);
