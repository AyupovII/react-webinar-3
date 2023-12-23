import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import getFormatDate from '../../utils/formate-date';

function ItemComment({ user, date, text, setSelectComment, currentUser, id, t }) {
  const cn = bem('ItemComment');
  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <div className={cn(`${(currentUser===user)? "active_user": "user"}`)}>{user}</div>
        <div className={cn("date")}>{getFormatDate(date)}</div>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      <div className={cn('btn')} onClick={() => setSelectComment(id)}>{t("comments.toAnswer")}</div>
    </div>
  );
}

ItemComment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  setSelectComment: PropTypes.func,
  setSelectComment: PropTypes.func,
  currentUser: PropTypes.string,
  id: PropTypes.string,
  t: PropTypes.func
};

ItemComment.defaultProps = {
  onAdd: () => {
  },
  t: (text) => text
}

export default memo(ItemComment);
