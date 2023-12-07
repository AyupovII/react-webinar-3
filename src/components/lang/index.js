import { memo, useCallback } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";


function Lang() {

  const store = useStore();
  const select = useSelector(state => ({
    lang: state.lang.lang,
  }));

  const callbacks = {
    // Изменение языка
    selectLang: useCallback(code => store.actions.lang.selectLang(code), [store]),
  }

  const cn = bem('Lang');
  const langList = ["ru", "eng"];
  return (
    <div className={cn('')}>
      <div className={cn('current')}>
        {select.lang}
      </div>
      <div className={cn('list')}>
        {langList.map(langCode => {
          return (
            <div
              key={langCode}
              className={cn('item')}
              onClick={() => callbacks.selectLang(langCode)}
            >
              {langCode}
            </div>)
        })}
      </div>

    </div>
  );
}

export default memo(Lang);
