import StoreModule from "../module";

/**
 * Состояние профиля - личный кабинет
 */
class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    const token = localStorage.getItem('token');
    const username = token ? localStorage.getItem('userName') : '';
    return {
      token,
      username,
      profile: null,
      error: null,
      waiting: false,
      isAuthorized: Boolean(token && username),
    }
  }

  /**
   * Авторизация
   */
  async fetchLogin(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const profile = await fetch("/api/v1/users/sign", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, "remember": true })
    });
    const json = await profile.json();
    if ((profile.status == 200)) {
      this.setState({
        ...this.getState(),
        profile: json.result.user,
        username: json.result.user.profile.name,
        token: json.result.token,
        waiting: false,
        isAuthorized: true,
      }, 'Пользователь авторизован');
      localStorage.setItem("token", json.result.token);
      localStorage.setItem("userName", json.result.user.profile.name);
    }
    else {
      this.setState({
        ...this.getState(),
        error: {
          message: json.error.message,
          code: json.error.code,
        },
        waiting: false,
        isAuthorized: false,
      }, 'Ошибка авторизации');
    }

  };

  async logout() {
    const token = this.getState().token;
    await fetch("/api/v1/users/sign", {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });

    this.setState({
      ...this.getState(),
      token: null,
      username: null,
      profile: null,
      error: null,
      waiting: false,
      isAuthorized: false,
    }, "Вышел из учётки");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  async checkLogin() {
    const token = this.getState().token;
    if (!token) return
    const profile = await fetch("/api/v1/users/self?fields=*", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });
    const json = await profile.json();
    if (profile.status == 200) {
      this.setState({
        ...this.getState(),
        profile: json.result,
        username: json.result.profile.name,
        waiting: false,
        isAuthorized: true,
      }, 'Данные получены из профиля');
    }
    else {
      this.setState({
        ...this.getState(),
        error: {
          message: json.error.message,
          code: json.error.code,
        },
        waiting: false,
        isAuthorized: false,
        token: null,
        username: null,
        profile: null,
      }, 'Ошибка при получении данных');
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
  }

}

export default ProfileState;
