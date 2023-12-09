import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { getTranslate } from '../../utils';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.params.skip,
    params: state.catalog.params,
    total: state.catalog.total,
    currentPage: state.catalog.currentPage,
    lang: state.lang.lang,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Клик по пагинации на номер страницы
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
    selectLang: useCallback(code => store.actions.lang.selectLang(code), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={getTranslate("shop")} lang={select.lang} selectLang={callbacks.selectLang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        setCurrentPage={callbacks.setCurrentPage}
        params={select.params}
        total={select.total}
        currentPage={select.currentPage}
      />
    </PageLayout>

  );
}

export default memo(Main);
