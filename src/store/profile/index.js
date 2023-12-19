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
    return {
      token: "",
      isAuthorized: false,
      profile: null,
      error: null,
      waiting: false,
    }
  }

  async loadProfile() {
    const token = localStorage.getItem('token')
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
        profile: null,
      }, 'Ошибка при получении данных');
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
  }

}

export default ProfileState;
