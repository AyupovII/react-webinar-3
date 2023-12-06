import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import Article from './article';
import { Route, Routes, Navigate } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/card' element={<Main />} />
        <Route path='/card/:id' element={<Article />} />
        <Route
          path="*"
          element={<Navigate to="/card" replace />}
        />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
