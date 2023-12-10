import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      params: {
        limit: 10,
        skip: 0,
      },
      total: 0,
      currentPage: 1,
      loading: false,
    }
  }

  async load( currentPage=1 ) {
    this.setState({
      ...this.store.getState().catalog,
      loading: true,
    }, 'Идет загрузка');
    const response = await fetch('/api/v1/articles?fields=items(_id, title, price),count&'
      + new URLSearchParams({ ...this.getState().params, skip: (currentPage - 1) * this.getState().params.limit }));
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      total: json.result.count,
      loading: false,
    }, 'Загружены товары из АПИ');
  }

  /**
 * Установка текущей страницы
 * @param currentPage номер текущей страницы
 */
  setCurrentPage(currentPage) {
    this.setState({
      ...this.getState(),
      params: {
        ...this.getState().params, skip: (currentPage - 1) * this.getState().params.limit
      },
      currentPage,
    }, 'Изменение страницы навигации');
  }
}

export default Catalog;
