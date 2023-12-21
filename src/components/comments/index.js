import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ItemComment from '../item-comment';
import FieldComment from '../field-comment';
import WarningBlock from '../warning-block';

function Comments({ data, count, selectComment, setSelectComment, exists, currentUser, sendComment, t }) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <div className={cn('header')}>{`Комментарии (${count})`}</div>
      <div className={cn('list')}>
        {
          data.map((comment) => {
            return (
              <div key={comment.dateCreate}>
                <ItemComment
                  id={comment._id}
                  setSelectComment={setSelectComment}
                  level={comment.level}
                  date={comment.dateCreate}
                  text={comment.text}
                  user={comment.author.profile.name}
                  currentUser={currentUser}
                  t={t}
                />
                {(selectComment === comment?._id)
                  ?
                  !exists
                    ?
                    <WarningBlock level={comment.level} setSelectComment={setSelectComment}  t={t}/>
                    :
                    <FieldComment level={comment.level} setSelectComment={setSelectComment} selectComment={selectComment} sendComment={sendComment}  t={t} />
                  :
                  null}
              </div>)
          })
        }

      </div>
    </div>
  );
}

Comments.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    level: PropTypes.number,
    text: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      }),
    }),
  })),
  count: PropTypes.number,
  selectComment: PropTypes.string,
  exists: PropTypes.bool,
  currentUser: PropTypes.string,
  sendComment: PropTypes.func,
  t: PropTypes.func
};

Comments.defaultProps = {
  sendComment: () => {
  },
  t: (text) => text
}

export default memo(Comments);
