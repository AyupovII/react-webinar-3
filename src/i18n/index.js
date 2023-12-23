import * as translations from './translations';

/**
 * сервис языка в приложении
 */
class I18NService {

  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.lang = config.defaultLang;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор языка
   * @returns {String} код языка
   */
  getLang() {
    return this.lang;
  }

  /**
 * Изменение языка и заголовка для api
 * @param lang {String} Код языка
 * @returns {<void>}
 */
  changeLang(lang) {
    // window.localStorage.setItem("lang", lang);
    this.lang = lang;
    this.services.api.setHeader("X-lang", lang);
    for (const listener of this.listeners) listener(this.lang);
  }

  /**
   * Установка состояния
   * @param lang {String}
   * @param text {String}
   * @param [plural] {Number}
   * @returns {String}
   */
  translate(lang, text, plural) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18NService;
