import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function WarningBlock({ setSelectComment, isNewComment, t }) {
  const cn = bem('WarningBlock');
  return (
    <div className={cn()}>
      <Link to='/login'>Войдите</Link>, чтобы иметь возможность ответить. {
        !isNewComment &&
        <div
          className={cn("cancel")}
          onClick={() => setSelectComment(null)}
        >
          Отмена
        </div>}
    </div>
  );
}

WarningBlock.propTypes = {
  level: PropTypes.number,
  setSelectComment: PropTypes.func,
  isNewComment: PropTypes.bool,
  style: PropTypes.object,
  t: PropTypes.func
};

WarningBlock.defaultProps = {
  t: (text) => text
}

export default memo(WarningBlock);
