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
    }
  }
    /**
   * Загрузка товара из /api
   * @param id номер текущей страницы
   */
  async loadArticle(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json);
    this.setState({
      data: json.result,
    }, 'Загружен товар из АПИ');
  };

  clearState(){
    this.setState({
      data: {},
    }, 'Очистка состояния');
  }

}

export default Article;
