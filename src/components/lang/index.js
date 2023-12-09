import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";


function Lang({ lang, selectLang }) {

  const cn = bem('Lang');
  const langList = ["ru", "eng"];
  return (
    <div className={cn('')}>
      <div className={cn('current')}>
        {lang}
      </div>
      <div className={cn('list')}>
        {langList.map(langCode => {
          return (
            <div
              key={langCode}
              className={cn('item')}
              onClick={() => selectLang(langCode)}
            >
              {langCode}
            </div>)
        })}
      </div>

    </div>
  );
};

Lang.propTypes = {
  lang: PropTypes.string,
  selectLang: PropTypes.func,
};

Lang.defaultProps = {
  selectLang: () => { },
}

export default memo(Lang);
