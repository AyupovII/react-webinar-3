import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ArticleItem from '../../components/article-item';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader';
import { getTranslate } from '../../utils';

function Article() {

  const store = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const mainText = getTranslate("main");
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.article.data,
    loading: state.article.loading,
    lang: state.lang.lang,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAdd: () => store.actions.basket.addToBasket(select.data._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    selectLang: useCallback(code => store.actions.lang.selectLang(code), [store]),
  }

  useLayoutEffect(() => {
    store.actions.article.loadArticle(id);
    store.actions.catalog.setCurrentPage(1);
    return () => {
      store.actions.article.clearState();
    }
  }, [id]);

  return (
    <PageLayout>
      {select.loading ? <Loader /> :
        <>
          <Head title={select.data.title} lang={select.lang} selectLang={callbacks.selectLang} />
          <BasketTool
            renderLeftSide={<Link style={{ color: "#0087E9" }} to="/card">{mainText}</Link>}
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
