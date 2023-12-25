export default {
  /**
   * Загрузка комментарий
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего списка комментарий и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // комментарий загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items, count: res.data.result.count } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    }
  },
  sendComment: (data, name) => {
    return async (dispatch, getState, services) => {
      // Отправка комментарии и установка признака ожидания загрузки
      dispatch({ type: 'sendComment/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "post",
          body: JSON.stringify(data),
          fields: "*"
        });
        // Комментарий успешно опубликован
        dispatch({ type: 'sendComment/load-success', payload: { data: { ...res.data.result, author: { profile: { name, _id: res.data.result.author._id } } } } });
      } catch (e) {
        //Ошибка публикации
        dispatch({ type: 'sendComment/load-error' });
      }
    }
  },
}
