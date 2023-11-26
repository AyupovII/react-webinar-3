const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Функция создания уникального кода
 * @param list {Array} Название HTML тега
 * @returns {Number}
 */
export function createCode(list) {
  let randomNum = 0;
  do {
    randomNum = Math.floor(Math.random() * 1000);
  } while (list.some((item) => item.code === randomNum))
  return randomNum;
}

/**
 * Функция создания уникального кода
 * если кончается на 2,3,4 - пишем "раза" (исключения 12,13,14)
 * @param counter {Number} Название HTML тега
 * @returns {Number}
 */
export function clickСounter(counter) {
  const counterToString = String(counter);
  if (counterToString.endsWith("2") && !counterToString.endsWith("12") || counterToString.endsWith("3") && !counterToString.endsWith("13") || counterToString.endsWith("4") && !counterToString.endsWith("14")) {
    return ` | Выделяли ${counter} разa`
  }
  return ` | Выделяли ${counter} раз`
}