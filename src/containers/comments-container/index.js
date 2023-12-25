import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import shallowequal from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';
import Comments from '../../components/comments';
import FieldComment from '../../components/field-comment';
import useSelector from '../../hooks/use-selector';
import commmentsActions from '../../store-redux/comments/actions';
import WarningBlock from '../../components/warning-block';
import { useParams } from 'react-router-dom';

function CommentsContainer() {
  const dispatch = useDispatch();
  const { id: articleId } = useParams();
  const select = useSelectorRedux(state => ({
    comments: state.comments.data.length ? state.comments.data : [],
    waitingComments: state.comments.waiting,
    count: state.comments.count,

  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const comments = useMemo(() => {
    if (select.comments?.length) {
      return listToTree(select.comments)[0].children
    }
    return []
  }, [select.comments]);
  const exists = useSelector(state => state.session.exists);
  const currentUser = useSelector(state => state.session.user.profile?.name);
  const [selectComment, setSelectComment] = useState(null);

  // Функция для локализации текстов
  const { t } = useTranslate();

  const sendComment = (commentData) => {
    dispatch(commmentsActions.sendComment(commentData, currentUser));
    setSelectComment(null);
  }



  return (
    <Spinner active={select.waitingComments}>
      <Comments
        selectComment={selectComment}
        setSelectComment={setSelectComment}
        count={select.count}
        data={comments}
        exists={exists}
        currentUser={currentUser}
        sendComment={sendComment}
        t={t}
      />
      <div style={{ padding: "0px 40px 30px 40px" }}>
        {!selectComment && (exists ? <FieldComment
          articleId={articleId}
          sendComment={sendComment}
          exists={exists}
          isNewComment
          t={t}
        /> : <WarningBlock
          isNewComment
          exists={exists}
        selectComment={selectComment}

          t={t}
        />
        )}
      </div>
    </Spinner>
  );
}

export default memo(CommentsContainer);
