import { memo, useCallback, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { paginationRange } from "../../utils";

function Pagination() {
  const store = useStore();
  const select = useSelector(state => ({
    params: state.catalog.params,
    total: state.catalog.total,
    currentPage: state.catalog.currentPage
  }));

  const countPages = useMemo(() => Math.ceil(select.total / select.params.limit), [select.total]);
  const paginationList = useMemo(() => paginationRange(countPages, select.currentPage, 1), [select.total, select.currentPage]);

  return (
    <div className='Pagination'>
      {
        paginationList.map((item, index) => {
          return Number.isInteger(item) ? <div
            key={item}
            className={'Pagination-item' + (select.currentPage === item ? ' Pagination-item-active' : '')}
            onClick={() => Number.isInteger(item) && store.actions.catalog.setCurrentPage(item)}>
            {item}
          </div> : <div key={item} className={'Pagination-points'}>{item}</div>
        }
        )}
    </div>
  )
};

export default memo(Pagination);
