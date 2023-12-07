import StoreModule from "../module";

class Lang extends StoreModule {

  initState() {
    return {
      lang: "ru",
    }
  }

  /**
   * Выбор языка
   * @param code Код страны
   */
  selectLang(code) {
    this.setState({
      lang: code
    }, `Изменен язык на ${code}`);
  }
}

export default Lang;
