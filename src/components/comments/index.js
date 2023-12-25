import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ItemComment from '../item-comment';
import FieldComment from '../field-comment';
import WarningBlock from '../warning-block';

function Comments({ data, count, selectComment, setSelectComment, exists, currentUser, sendComment, t }) {
  const cn = bem('Comments');

  const comments = {
    render: useCallback(({ data, selectComment, setSelectComment, exists, currentUser, sendComment, level = 0, t }) => (
      <>
        <div className={cn('list')} style={{ marginLeft: `${(level >= 5 || level == 0 ? 0 : 1) * 30}px` }}>
          {
            data.map((comment) => {
              return (
                <div className={cn("content")} key={comment._id}
                >
                  <ItemComment
                    id={comment._id}
                    setSelectComment={setSelectComment}
                    date={comment.dateCreate}
                    text={comment.text}
                    user={comment.author.profile.name}
                    currentUser={currentUser}
                    t={t}
                  />
                  {comment.children?.length ?
                    comments.render({ data: comment.children, selectComment, setSelectComment, exists, currentUser, sendComment, level: level + 1, t })
                    : null}
                  {(selectComment === comment?._id)
                    ?
                    <div style={{ marginLeft: `${(level >= 5 || level == 0 ? 0 : 1) * 30}px` }}>
                      {!exists
                        ?
                        <WarningBlock setSelectComment={setSelectComment} selectComment={selectComment} t={t} />
                        :
                        <FieldComment
                          setSelectComment={setSelectComment} selectComment={selectComment} sendComment={sendComment} t={t} />}
                    </div>
                    :
                    null}
                </div>)
            })
          }
        </div>
      </>
    ), [t]),
  };
  return (
    <div className={cn()}>
      <div className={cn('header')}>{`${t("comments.comments")} (${count})`}</div>
      {comments.render({ data, count, selectComment, setSelectComment, exists, currentUser, sendComment, t })}
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
