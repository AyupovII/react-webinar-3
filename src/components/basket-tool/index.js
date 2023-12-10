import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { getTranslate, numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, renderLeftSide }) {
  //были проблемы с рендером, поэтому логику перевода поднял выше
  //Rendered fewer hooks than expected. This may be caused by an accidental early return statement
  const translateText = {
    empty: getTranslate("empty"),
    product: getTranslate("product"),
    theProduct: getTranslate("theProduct"),
    products: getTranslate("products"),
  };
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <div className={cn("left")}>
        {renderLeftSide}
      </div>
      <div>
        <span className={cn('label')}>{getTranslate("inBasket")}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: translateText.product,
              few: translateText.theProduct,
              many: translateText.products
            })} / ${numberFormat(sum)} ₽`
            : translateText.empty
          }
        </span>
        <button onClick={onOpen}>{getTranslate("goOver")}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  renderLeftSide: PropTypes.node,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
