/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function myRange(start, size, step = 1) {
  const range = [];
  for (let i = start; i <= size; i += step) {
    range.push(i);
  }
  return range;
};

export function paginationRange(totalPage, page, siblings,) {
  let totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return myRange(1, totalPage + 1);
  }
  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);
  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = myRange(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPage]
  }
  else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = myRange(totalPage - rightItemsCount + 1, totalPage);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = myRange(leftSiblingsIndex, rightSiblingsIndex);
    return [1, "... ", ...middleRange, " ...", totalPage]
  }
} 
const obj={
  shopTitle:{
    ru: "Магазин",
    eng: "Shop",
    fr: "Жопе"
  },
  BasketTitle:{
    ru: "Корзина",
    eng: "Basket",
  },
}

const ru={
  shop: "Магазин",
  basket: "Корзина"
};
const eng={
  shop: "Shop",
  basket: "Basket"
}