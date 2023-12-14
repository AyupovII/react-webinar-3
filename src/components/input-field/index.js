import { memo } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';
function InputField(props) {

  const cn = bem('InputField');
  return (
    <div className={cn()}>
      <label className={cn("Label")}> {props.label}
        <input
          className={cn({ theme: props.theme })}
          {...props}
        />
      </label>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
  theme: ''
}

export default memo(InputField);
