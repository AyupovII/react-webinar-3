import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cardList = store.getState().shoppingCart;

  const countCard = store.getState().shoppingCart.length ?? 0;
  const totalSumm = store.getTotalSumm();

  const [openModal, setOpenModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        countCard={countCard}
        totalSumm={totalSumm}
        setOpenModal={setOpenModal}
      />
      <List
        list={list}
        onAddCard={callbacks.onAddItem} />
      <Modal
        active={openModal}
        setActive={setOpenModal}>
        <Basket cardList={cardList} onDeleteCard={callbacks.onDeleteItem} totalSumm={totalSumm} countCard={countCard}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
