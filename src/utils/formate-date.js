/**
 * Преобразование даты в формату "25 августа 2022 в 14:00"
 * @param date {Date}
 * @returns {String}
 */
export  default function getFormatDate(date) {
  const formattedDate = new Date(date);
  if (formattedDate=="Invalid Date") return "Invalid Date"
  const formatterTime = {
    hour: "numeric",
    minute: "numeric",
  };
  const formatterDate = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return formattedDate.toLocaleString("ru", formatterDate).slice(0, -3) + " в " + formattedDate.toLocaleString("ru", formatterTime)
}