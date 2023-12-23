import { useEffect, useMemo, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());
  const unsubscribe = useMemo(() => i18n.subscribe((lang) => setLang(lang)), []);

  useEffect(() => unsubscribe, [unsubscribe]);

  const resultObj = useMemo(()=>({
    lang,
    setLang: (selectLang) => {
      i18n.changeLang(selectLang);
      setLang(i18n.getLang());
    },
    t: (text, number) => i18n.translate(lang, text, number),
  }),[lang]);

  return resultObj;
}
