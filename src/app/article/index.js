import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ArticleItem from '../../components/article-item';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader';

function Article() {

  const store = useStore();
  const { id } = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.article.data,
    loading: state.article.loading,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAdd: () => store.actions.basket.addToBasket(select.data._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  useLayoutEffect(() => {
    store.actions.article.loadArticle(id);
    return () => {
      store.actions.article.clearState();
    }
  }, [id]);

  return (
    <PageLayout>
      {select.loading ? <Loader /> :
        <>
          <Head title={select.data.title} />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
          <ArticleItem id={id} data={select.data} onAdd={callbacks.onAdd} />
        </>}
    </PageLayout>
  );
}

export default memo(Article);
