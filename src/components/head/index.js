import {memo} from "react";
import PropTypes, { func } from "prop-types";
import './style.css';
import Lang from "../lang";

function Head({title, lang, selectLang}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Lang lang={lang} selectLang={selectLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  selectLang: PropTypes.func,
};

Head.defaultProps = {
  selectLang: () => { },
}


export default memo(Head);
