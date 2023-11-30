import React from "react";
import './style.css';
import PropTypes from 'prop-types';

const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? "Modal active" : "Modal"} onClick={() => setActive(false)}>
      <div className={active ? "Modal-content active" : "Modal-content"} onClick={e => e.stopPropagation()}>
        <div className="Modal-head">
          <div className="Modal-title">Корзина</div>
          <button className="Modal-button" onClick={() => setActive(false)}>Закрыть</button>
        </div>
        <div className="Modal-children">
          {children}
        </div>
      </div>

    </div>
  )
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  active: false,
  setActive: () => { },
}

export default Modal;