import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/use-store";

function ArticleItem({ id, data, onAdd }) {
  const cn = bem('ArticleItem');
  console.log("1wad", id);


  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {data?.description}
      </div>
      <div className={cn('madeIn')}>
        Страна производитель: <strong>{`${data?.madeIn?.title} (${data?.madeIn?.code})`}</strong>
      </div>
      <div className={cn('category')}>
        Категория: <strong>{data?.category?.title}</strong>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <strong>{data.edition}</strong>
      </div>
      <div className={cn('price')}>
        Цена: {numberFormat(data?.price)} ₽
      </div>
      <button onClick={onAdd} className={cn('button')}>Добавить</button>
    </div>
  );
}

// Item.propTypes = {
//   item: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     title: PropTypes.string,
//     price: PropTypes.number
//   }).isRequired,
//   onAdd: PropTypes.func,
// };

// Item.defaultProps = {
//   onAdd: () => {},
// }

export default memo(ArticleItem);
