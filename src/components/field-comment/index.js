import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FieldComment({ sendComment, level, setSelectComment, isNewComment, selectComment, articleId, style, t }) {
  const [value, setValue] = useState("");
  console.log(value);
  const cn = bem('FieldComment');
  return (
    <div className={cn()} style={{ ...style, marginLeft: `${(level - 1) * 30}px` }}>
      <div className={cn('header')}>
        Новый комментарий
      </div>
      <textarea className={cn('textarea')} placeholder='Текст' defaultValue={value} onChange={(e) => setValue(e.target.value)} />
      <div className={cn('control')}>
        <button onClick={() => sendComment({ text: value, parent: { _id: isNewComment ? articleId : selectComment, _type: isNewComment ? "article" : "comment" } })}>Отправить</button>
        {!isNewComment && <button onClick={() => setSelectComment(null)}>Отмена</button>}
      </div>
    </div>
  );
}

FieldComment.propTypes = {
  level: PropTypes.number,
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
