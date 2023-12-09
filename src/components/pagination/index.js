import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { paginationRange } from "../../utils";

function Pagination({ setCurrentPage, params, total, currentPage }) {
  const countPages = useMemo(() => Math.ceil(total / params.limit), [total]);
  const paginationList = useMemo(() => paginationRange(countPages, currentPage), [total, currentPage]);

  return (
    <div className='Pagination'>
      {
        paginationList.map((item) => {
          return Number.isInteger(item) ? <div
            key={item}
            className={'Pagination-item' + (currentPage === item ? ' Pagination-item-active' : '')}
            onClick={() => setCurrentPage(item)}>
            {item}
          </div> : <div key={item} className={'Pagination-points'}>{item}</div>
        }
        )}
    </div>
  )
};

Pagination.propTypes = {
  params: PropTypes.shape({
    limit: PropTypes.number,
  }).isRequired,
  total: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

Pagination.defaultProps = {
  setCurrentPage: () => {},
}

export default memo(Pagination);
