import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FieldComment({ sendComment, setSelectComment, isNewComment, selectComment, articleId, t }) {
  const [value, setValue] = useState("");
  const cn = bem('FieldComment');
  return (
    <div className={cn()} >
      <div className={cn('header')}>
      {isNewComment ? "Новый комментарий" : "Новый ответ"}
      </div>
      <textarea className={cn('textarea')} placeholder='Текст' defaultValue={value} onChange={(e) => setValue(e.target.value.trim())} />
      <div className={cn('control')}>
        <button onClick={() => sendComment({ text: value, parent: { _id: isNewComment ? articleId : selectComment, _type: isNewComment ? "article" : "comment" } })}>Отправить</button>
        {!isNewComment && <button onClick={() => setSelectComment(null)}>Отмена</button>}
      </div>
    </div>
  );
}

FieldComment.propTypes = {
  isNewComment: PropTypes.bool,
  selectComment: PropTypes.string,
  articleId: PropTypes.string,
  setSelectComment: PropTypes.func,
  sendComment: PropTypes.func,
  t: PropTypes.func
};

FieldComment.defaultProps = {
  sendComment: () => {
  },
  setSelectComment: () => {
  },
  t: (text) => text
}

export default memo(FieldComment);
