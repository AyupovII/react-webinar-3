import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({ countCard, totalSumm, setOpenModal }) {
  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <div className="Controls-total">{countCard ? `${countCard} ${plural(countCard, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${totalSumm} ₽` : "Пусто"} </div>
      <button onClick={() => setOpenModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  countCard: PropTypes.number,
  totalSumm: PropTypes.string,
  setOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  countCard: 0,
  totalSumm: "0",
  setOpenModal: () => { },
}

export default React.memo(Controls);
