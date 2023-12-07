import {backendUrl, ROUTES_API} from '../config.js';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const DELETE_METHOD = 'DELETE';
const PUT_METHOD = 'PUT';

export class API {
  /**
   * Проверяет, является ли пользователь авторизованным.
   *
   * @async
   * @function
   // eslint-disable-next-line max-len
   * @return {Promise<{isAuthorized: boolean,
   * authorizedUser: ({password: *, name: *, email: *, username: *} | null)}>} Объект* с информацией
   * о статусе авторизации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async isAuth() {
    try {
      const url = backendUrl + ROUTES_API.isAuth.url;

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });

      const body = await res.json();
      let isAuthorized = false;
      let authorizedUser;

      if (res.ok) {
        isAuthorized = true;
        authorizedUser = body.current_user;
      }

      return {isAuthorized, authorizedUser};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода isAuth:', e);
      throw (e);
    }
  }

  /**
   * Функция для авторизации пользователя.
   *
   * @async
   * @function
   * @param {string} email - Почта.
   * @param {string} password - Пароль.
   * @return {Promise<{message: string,
   * authorizedUser: ({password: *, name: *, email: *, username: *} | null)}>} Объект с информацией
   * о статусе авторизации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userLogin(email, password) {
    try {
      const url = backendUrl + ROUTES_API.login.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
      });

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 450) {
        return {message: 'Нет подключения к сети', authorizedUser: null};
      }
      if (res.status === 400) {
        message = 'Невозможно выполнить вход. Завершите предыдущую сессию!';
      }
      if (res.status === 401) {
        message = 'Неправильный логин или пароль';
      }
      if (res.status === 200) {
        message = 'ok';
      }

      const body = await res.json();

      return {message, authorizedUser: body.data};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода userLogin:', e);
      throw (e);
    }
  }

  /**
   * Функция для выхода из аккаунта пользователя.
   *
   * @async
   * @function
   * @return {Promise<{message: string}>} - статус выхода из аккаунта.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userLogout() {
    try {
      const url = backendUrl + ROUTES_API.logout.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети'};
      }

      if (res.status === 404) {
        return {message: 'Вы не авторизованы, обновите страницу'};
      }
      if (res.status === 408) {
        return {message: 'Потеряно соединение с сервером'};
      }

      return {message: 'ok'};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода userLogout:', e);
      throw (e);
    }
  }

  /**
   * Функция для регистрации пользователя.
   *
   * @async
   * @function
   * @param {string} first_name - Имя.
   * @param {string} username - Имя пользователя.
   * @param {string} email - Почта.
   * @param {string} password - Пароль.
   * @param {string} avatar - Аватар пользователя в формате Base64.
   * @return {Promise<{registeredUser: ({password: *, name: *, email: *, username: *} | null),
   * message: string}>} Объект с информацией о статусе регистрации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  // eslint-disable-next-line camelcase
  async userSignup(first_name, username, email, password, avatar = '') {
    try {
      const url = backendUrl + ROUTES_API.signup.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          // eslint-disable-next-line camelcase
          first_name, username, email, password, avatar,
        }),
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', registeredUser: null};
      }

      const body = await res.json();

      const registeredUser = body.data;
      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 409) {
        message = 'Пользователь уже существует';
      }
      if (res.status === 400) {
        message = 'Невозможно зарегистрироваться. Завершите предыдущую сессию!';
      }
      if (res.ok) {
        message = 'ok';
      }

      return {message, registeredUser};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода userSignup:', e);
      throw (e);
    }
  }

  /**
   * Функция для обновления профиля пользователя.
   *
   * @async
   * @function
   * @param {string} first_name - Имя.
   * @param {string} username - Имя пользователя.
   * @param {string} email - Почта.
   * @param {string} oldPassword - Текущий пароль.
   * @param {string} newPassword - Новый пароль.
   * @param {string} avatar - Аватар пользователя в формате Base64.
   * @return {Promise<{updatedUser: ({password: *, name: *, email: *, username: *} | null),
   * message: string}>} Объект с информацией о статусе изменения и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  // eslint-disable-next-line camelcase
  async updateProfile(first_name, username, email, oldPassword, newPassword, avatar = '') {
    try {
      const url = backendUrl + ROUTES_API.updateProfile.url;

      const res = await fetch(url, {
        method: PUT_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          // eslint-disable-next-line camelcase
          first_name, username, email, oldPassword, newPassword, avatar,
        }),
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', updatedUser: null};
      }

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 403) {
        message = 'Введен неправильный пароль';
      }
      if (res.status === 404) {
        message = 'Пользователь не найден';
      }
      if (res.status === 409) {
        message = 'Пользователь с такими email/username уже существует';
      }
      if (res.ok) {
        message = 'ok';
      }

      const body = await res.json();
      const updatedUser = body.data;

      return {message, updatedUser};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода userSignup:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения всех опросов.
   * Через Query запрос можно осуществить поиск по автору опросов, задав его username
   *
   * @async
   * @function
   * @param {string} authorUsername - Опционально. Username автора
   * @return {Promise<{forms: ( null | [] )}>} Объект с массивом с опросами.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getForms(authorUsername = '') {
    try {
      let url = backendUrl + ROUTES_API.forms.url;
      if (authorUsername !== '') {
        const query = `?author=${authorUsername}`;
        url += query;
      }

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', forms: null};
      }

      const body = await res.json();

      if (res.ok) {
        const forms = body.data.forms;
        return {message: 'ok', forms};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', forms: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getForms:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения списка опросов по искомому названию.
   * Возращает список всех созданных текущим пользователем опросов в порядке, где на первом месте стоит
   * опрос с самым похожим названием на искомое, и так далее.
   * Через Query запрос передается искомое название
   *
   * @async
   * @function
   * @param {string} title - название искомого опроса
   * @return {Promise<{forms: ( null | [] )}>} Объект с массивом с опросами.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getFormsByTitle(title = '') {
    try {
      let url = backendUrl + ROUTES_API.searchForms.url;
      const query = `?title=${title}`;
      url += query;

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', forms: null};
      }

      const body = await res.json();

      if (res.ok) {
        const forms = body.data.forms;
        return {message: 'ok', forms};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', forms: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getFormsByTitle:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения опроса по его id.
   *
   * @async
   * @function
   * @param {number} id - ID.
   * @return {Promise<{form: any | null}>} Объект с информацией об искомом опросе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getFormByID(id) {
    try {
      const url = backendUrl + ROUTES_API.form.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', form: null};
      }

      const body = await res.json();

      if (res.ok) {
        const form = body.data;
        return {message: 'ok', form};
      }
      if (res.status === 404) {
        return {message: '404', form: null};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения аватарки пользователя по его username.
   *
   * @async
   * @function
   * @param {string} username - Никнейм пользователя.
   * @return {Promise<{avatar: string | null, message: string}>} Объект с информацией
   * о статусе запроса и с аватаркой в виде base64 кода.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getAvatar(username) {
    try {
      const url = backendUrl + ROUTES_API.avatar.url.replace(':username', username);

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });

      const body = await res.json();

      if (res.ok) {
        const avatar = body.data.avatar;
        return {message: 'ok', avatar};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', avatar: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для сохранения опроса на сервере.
   *
   * @async
   * @function
   * @param {form} saveForm - объект, содержащий информацию об опросе.
   * @return {Promise<{form: * | null, message: string}>} Объект с информацией
   * о статусе запроса и формой опубликованного опроса.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async saveForm(saveForm) {
    try {
      const url = backendUrl + ROUTES_API.saveForm.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(saveForm),
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', form: null};
      }

      const body = await res.json();

      if (res.ok) {
        const form = body.data;
        return {message: 'ok', form};
      }
      if (res.status === 408) {
        return {message: 'Потеряно соединение с сервером', form: null};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода saveForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для обновления опроса на сервере.
   *
   * @async
   * @function
   * @param {form} updateForm - объект, содержащий информацию об измененном опросе.
   * @return {Promise<{form: * | null, message: string}>} Объект с информацией
   * о статусе запроса и формой обновленного опроса.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async updateForm(updateForm) {
    try {
      const url = backendUrl + ROUTES_API.updateForm.url.replace(':id', updateForm.id.toString());

      const res = await fetch(url, {
        method: PUT_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateForm),
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', form: null};
      }

      const body = await res.json();

      if (res.ok) {
        const form = body.data;
        return {message: 'ok', form};
      }
      if (res.status === 408) {
        return {message: 'Потеряно соединение с сервером', form: null};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода updateForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для удаления опроса с сервера.
   *
   * @async
   * @function
   * @param {number} id - ID удаляемого опроса.
   * @return {Promise<{message: string}>} Объект с информацией о статусе запроса.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async deleteForm(id) {
    try {
      const url = backendUrl + ROUTES_API.deleteForm.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: DELETE_METHOD,
        credentials: 'include',
      });

      if (res.status === 450) {
        return {message: 'Нет подключения к сети'};
      }
      if (res.ok) {
        return {message: 'ok'};
      }
      if (res.status === 408) {
        return {message: 'Потеряно соединение с сервером'};
      }
      if (res.status === 404) {
        return {message: 'Опрос не удалось обнаружить: уже удален.'};
      }

      return {message: 'Ошибка сервера. Попробуйте позже'};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода deleteForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения результатов опроса по его id.
   *
   * @async
   * @function
   * @param {number} id - ID.
   * @return {Promise<{formResults: any | null}>} Объект с информацией об искомом опросе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getFormResultsByID(id) {
    try {
      const url = backendUrl + ROUTES_API.formResults.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', formResults: null};
      }

      const body = await res.json();

      if (res.ok) {
        const formResults = body.data;
        return {message: 'ok', formResults};
      }
      if (res.status === 404) {
        return {message: '404', formResults: null};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', formResults: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getFormResultsByID:', e);
      throw (e);
    }
  }

  /**
   * Функция для сохранения прохождении опроса на сервере.
   *
   * @async
   * @function
   * @param {{passage_answers: *[], form_id}} passageJSON - объект, содержащий информацию о прохождении опроса.
   * @return {Promise<{form: * | null, message: string}>} Объект с информацией
   * о статусе запроса и формой опубликованного опроса.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async passageForm(passageJSON) {
    try {
      const url = backendUrl + ROUTES_API.passForm.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(passageJSON),
      });

      if (res.ok) {
        return {message: 'ok'};
      }

      if (res.status === 400) {
        return {message: 'Введены не валидные данные', form: null};
      }

      if (res.status === 401) {
        return {message: 'Пользователь не авторизирован для прохождения опроса', form: null};
      }

      if (res.status === 450) {
        return {message: 'Нет подключения к сети', form: null};
      }

      return {message: 'Ошибка сервера. Попробуйте позже', form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода passageForm:', e);
      throw (e);
    }
  }
}
