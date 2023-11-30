import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({countCard, totalSumm, setOpenModal}) {
  return (
    <div className='Controls'>
    <div>В корзине: </div>
    <div className="Controls-total">{countCard ? `${countCard} товара / ${totalSumm} ₽` : "Пусто"} </div>
      <button onClick={() => setOpenModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  countCard: PropTypes.number,
  totalSumm: PropTypes.number,
  setOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  countCard: 0,
  totalSumm: 0,
  setOpenModal: ()=>{},
}

export default React.memo(Controls);
