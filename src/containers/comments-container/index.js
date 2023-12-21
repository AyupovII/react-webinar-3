import { memo, useCallback, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import shallowequal from 'shallowequal';
import modalsActions from '../../store-redux/modals/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
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
    comments: state.comments.data,
    waitingComments: state.comments.waiting,
    count: state.comments.count,

  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const exists = useSelector(state => state.session.exists);
  const currentUser = useSelector(state => state.session.user.profile?.name);
  const [selectComment, setSelectComment] = useState(null);

  // Функция для локализации текстов
  const { t } = useTranslate();
  const tree = listToTree(select.comments.length ? select.comments:[], "_id");
  const newComments = treeToList(tree, (item, level) => ({ ...item, level }));
  newComments.shift();

  const sendComment = (commentData) => {
    dispatch(commmentsActions.sendComment(commentData));
    setSelectComment(null);
  }

  return (
    <Spinner active={select.waitingComments}>
      <Comments
        selectComment={selectComment}
        setSelectComment={setSelectComment}
        count={select.count}
        data={newComments}
        exists={exists}
        currentUser={currentUser}
        sendComment={sendComment}
        t={t}
      />
      {!selectComment && (exists ? <FieldComment
        articleId={articleId}
        sendComment={sendComment}
        level={1}
        exists={exists}
        isNewComment
        style={{ padding: "10px 40px" }}
        t={t}
      /> : <WarningBlock isNewComment style={{ padding: "20px 40px" }} t={t}/>)}
    </Spinner>
  );
}

export default memo(CommentsContainer);
