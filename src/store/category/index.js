import StoreModule from "../module";
import { getStructuredList } from "../../utils";

/**
 * Состояние category - выпающий список каталога
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    }
  }

  /**
   * Загрузка типов списка каталога
   */
  async loadCategories() {
    const category = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await category.json();
    this.setState({
      ...this.getState(),
      list: [{ title: "Все", value: ""}, ...getStructuredList(json.result.items)]
    }, 'Загружен сприсок категорий для фильтрации');
  }

}

export default CategoryState;
