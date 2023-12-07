import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getTranslate } from "../../utils";

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{getTranslate("add")}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
