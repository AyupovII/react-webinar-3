import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {
  const isBasket = !!props.onAddCard;
  const callbacks = {
    onAddCard: (e) => {
      e.stopPropagation();
      props.onAddCard(props.item.code);
    },
    onDeleteCard: (e) => {
      e.stopPropagation();
      props.onDeleteCard(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{`${props.item.price} ₽`}</div>
      {!isBasket &&
        <div className='Item-count'>{`${props.item.count} шт`}</div>}
      <div className='Item-actions'>
        {isBasket ?
          <button onClick={callbacks.onAddCard}>
            Добавить
          </button>
          :
          <button onClick={callbacks.onDeleteCard}>
            Удалить
          </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteCard: PropTypes.func,
  onAddCard: PropTypes.func,

};

Item.defaultProps = {
  onDelete: undefined,
  onAddCard: undefined,
}

export default React.memo(Item);
