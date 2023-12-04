import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import './style.css';

function Basket({ cardList, onDeleteCard, totalSumm, countCard }) {
  return (
    <div className='Basket'>
      {countCard ? <>
        <List
          list={cardList}
          onDeleteCard={onDeleteCard}
        />
        <div className="Basket-total">
          <div>Итого</div>
          <div className="Basket-summ">{`${totalSumm} ₽`}</div>
        </div> </> : <div className="Basket-empty">"Корзина пуста"</div>
      }
    </div>
  )
}

Basket.propTypes = {
  cardList: PropTypes.array,
  onDeleteCard: PropTypes.func,
  totalSumm: PropTypes.string,
  countCard: PropTypes.number,
};

Basket.defaultProps = {
  onDeleteCard: () => { },
  totalSumm: "0",
  countCard: 0,
}

export default React.memo(Basket);
