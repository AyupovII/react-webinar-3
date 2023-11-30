import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddCard, onDeleteCard}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddCard={onAddCard} onDeleteCard={onDeleteCard}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddCard: PropTypes.func,
  onDeleteCard: PropTypes.func,
};

List.defaultProps = {
  onDeleteCard: undefined,
  onAddCard: undefined,
}

export default React.memo(List);
