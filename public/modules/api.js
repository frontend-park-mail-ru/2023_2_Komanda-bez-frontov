import { backendUrl, ROUTES_API } from '../config.js';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';

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
        credentials: "include",
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
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 400) {
        message = 'Невозможно выполнить вход. Завершите предыдущую сессию!';
      }
      if (res.status === 401) {
        message = 'Неправильный логин или пароль';
      }
      if (res.status === 200) {
        message = 'ok';
      }

      return { message, authorizedUser: body.data };
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
        credentials: "include",
      });

      if (res.status === 404) {
        return {message: 'Невозможно выйти из аккаунта - вы не авторизованы!'};
      }

      return {message: 'Вы вышли из аккаунта'};
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
   * @return {Promise<{registeredUser: ({password: *, name: *, email: *, username: *} | null),
   * message: string}>} Объект с информацией о статусе регистрации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userSignup(first_name, username, email, password) {
    try {
      const url = backendUrl + ROUTES_API.signup.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          first_name, username, email, password,
        }),
      });

      const body = await res.json();

      const registeredUser = body.data;
      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 409) {
        message = 'Пользователь уже существует';
      }
      if (res.status === 400) {
        message = 'Невозможно зарегистрироваться. Завершите предыдущую сессию!';
      }
      if (res.status !== 200) {
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
   * Функция для получения всех опросов.
   * П.С. Позже заменить на получение всех опросов за авторством пользователя.
   *
   * @async
   * @function
   * @return {Promise<{forms: ( null | [] )}>} Объект с информацией о статусе запроса и массивом с опросами.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getForms() {
    try {
      const url = backendUrl + ROUTES_API.forms.url;

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok) {
        const forms = body.data.forms;
        return {forms};
      }

      return {forms: null};
    } catch (e) {
      // TODO убрать к РК4
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
   * @return {Promise<{form: any | null}>} Объект с информацией о статусе запроса и об искомом опросе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async getFormByID(id) {
    try {
      const url = backendUrl + ROUTES_API.form.url.replace(':id', id.toString());

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok) {
        const form = body.data;
        return {message: 'ok', form};
      }
      if (res.status === 404) {
        return {message: '404', form: null};
      }

      return {message: 'Ошибка сервера', form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода getForm:', e);
      throw (e);
    }
  }
}
