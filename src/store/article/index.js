import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      data: {},
      loading: false,
    }
  }
    /**
   * Загрузка товара из /api
   * @param id номер текущей страницы
   */
  async loadArticle(id) {
    this.setState({
      ...this.store.getState(),
      loading: true,
    }, 'Идет загрузка');
    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      data: json.result,
      loading: false,
    }, 'Загружен товар из АПИ');
    return json.result;
  };

  clearState(){
    this.setState({
      data: {},
    }, 'Очистка состояния');
  }

}

export default Article;
