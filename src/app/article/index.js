import { memo, useCallback, useEffect } from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ArticleItem from '../../components/article-item';
import { useParams } from 'react-router-dom';

function Article() {

  const store = useStore();
  const { id } = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.article.data,
  }));

  console.log(select);

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAdd: () => store.actions.basket.addToBasket(select.data._id)
  }

  useEffect(() => {
    store.actions.article.loadArticle(id);
    return () => {
      store.actions.article.clearState();}
  }, []);

  return (
    <PageLayout>
      <Head title='Название товара' />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ArticleItem id={id} data={select.data} onAdd={callbacks.onAdd} />
    </PageLayout>
  );
}

export default memo(Article);
