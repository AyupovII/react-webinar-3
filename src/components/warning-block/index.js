import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function WarningBlock({ setSelectComment, isNewComment, selectComment, t }) {
  const cn = bem('WarningBlock');
  
  const ref = useRef();
  useEffect(() => {
   if  (selectComment) ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectComment])

  return (
    <div className={cn()} ref={ref}>
      <Link to='/login' state={{ back: location.pathname }}>{t("comments.logIn")}</Link>{t("comments.respond")} {
        !isNewComment &&
        <div
          className={cn("cancel")}
          onClick={() => setSelectComment(null)}
        >
          {t("comments.cancel")}
        </div>}
    </div>
  );
}

WarningBlock.propTypes = {
  level: PropTypes.number,
  selectComment: PropTypes.string,
  setSelectComment: PropTypes.func,
  isNewComment: PropTypes.bool,
  style: PropTypes.object,
  t: PropTypes.func,
  exists: PropTypes.bool,
};

WarningBlock.defaultProps = {
  t: (text) => text
}

export default memo(WarningBlock);
