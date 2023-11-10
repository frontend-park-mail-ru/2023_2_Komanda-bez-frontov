import { backendUrl, ROUTES_API } from '../config.js';

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
 * authorizedUser: ({password: *, name: *, email: *, username: *}|*)}>} Объект* с информацией
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

      return { isAuthorized, authorizedUser };
    } catch (e) {
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
   * @return {Promise<{status: number,
   * authorizedUser: ({password: *, name: *, email: *, username: *}|*)}>} Объект с информацией
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
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      const status = res.status;
      let authorizedUser;

      if (res.ok) {
        authorizedUser = body.data;
      }

      return { status, authorizedUser };
    } catch (e) {
      console.log('Ошибка метода userLogin:', e);
      throw (e);
    }
  }

  /**
   * Функция для выхода из аккаунта пользователя.
   *
   * @async
   * @function
   * @return {Promise< { status: number } >} Объект с номером статуса при выходе пользователя.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userLogout() {
    try {
      const url = backendUrl + ROUTES_API.logout.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        credentials: 'include',
      });

      const status = res.status;
      return {status};
    } catch (e) {
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
   * @return {Promise<{registeredUser: ({password: *, name: *, email: *, username: *}|*),
   * status: number}>} Объект с информацией о статусе регистрации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  // eslint-disable-next-line camelcase
  async userSignup(first_name, username, email, password, avatar) {
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

      const body = await res.json();

      const status = res.status;
      let registeredUser;

      if (res.ok) {
        registeredUser = body.data;
      }

      return {status, registeredUser};
    } catch (e) {
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
   * @return {Promise<{forms: ( * | [] ),
   *          count: ( * | number ), status: number}>} Объект с информацией
   * о статусе запроса и массивом с опросами.
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

      const body = await res.json();
      const status = res.status;

      if (res.ok) {
        const forms = body.data.forms;
        const count = body.data.count;
        return {status, count, forms};
      }

      return {status};
    } catch (e) {
      console.log('Ошибка метода getForms:', e);
      throw (e);
    }
  }

  /**
   * Функция для получения опроса по его id.
   *
   * @async
   * @function
   * @param {number} id - ID.
   * @return {Promise<{form: any, status: number}>} Объект с информацией
   * о статусе запроса и об искомом опросе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getForm(id) {
    try {
      const url = backendUrl + ROUTES_API.form.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });

      const body = await res.json();
      const status = res.status;

      if (res.ok) {
        const form = body.data;
        return {status, form};
      }

      return {status};
    } catch (e) {
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
   * @return {Promise<{avatar: * | any, status: number}>} Объект с информацией
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
      const status = res.status;

      if (res.ok) {
        const avatar = body.data.avatar;
        return {status, avatar};
      }

      return {status};
    } catch (e) {
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
   * @return {Promise<{form: * | any, status: number}>} Объект с информацией
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

      const body = await res.json();
      const status = res.status;

      if (res.ok) {
        const form = body.data;
        return {status, form};
      }

      return {status};
    } catch (e) {
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для обновления опроса на сервере.
   *
   * @async
   * @function
   * @param {form} updateForm - объект, содержащий информацию об измененном опросе.
   * @return {Promise<{form: * | any, status: number}>} Объект с информацией
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

      const body = await res.json();
      const status = res.status;

      if (res.ok) {
        const form = body.data;
        return {status, form};
      }

      return {status};
    } catch (e) {
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }

  /**
   * Функция для удаления опроса с сервера.
   *
   * @async
   * @function
   * @param {number} id - ID удаляемого опроса.
   * @return {Promise<{status: number}>} Объект с информацией о статусе запроса.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async deleteForm(id) {
    try {
      const url = backendUrl + ROUTES_API.deleteForm.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: DELETE_METHOD,
        credentials: 'include',
      });

      const status = res.status;

      return {status};
    } catch (e) {
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }
}
