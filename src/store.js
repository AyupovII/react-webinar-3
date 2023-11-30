import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи в корзину
   */
  addItem(code) {
    const currentProduct = this.state.list.find((el)=>el.code===code);
    const isInBasket = this.state.shoppingCart.find(el=>el.code===code);
    if (isInBasket){
      this.setState({
      ...this.state,
      shoppingCart: this.state.shoppingCart.map(item => {
        if (item.code === code) {
            item.count +=1;
        }
        return {...item};
      })
    })
    }
    else {
      this.setState({
        ...this.state,
        shoppingCart:[...this.state.shoppingCart, {...currentProduct, count: 1}],
      })
    }
  };
  getTotalSumm() {
    return this.state.shoppingCart.reduce((acc, curr)=>{ return acc+=curr.price*curr.count}, 0);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      shoppingCart: this.state.shoppingCart.filter(item => item.code !== code)
    })
  };
}

export default Store;
