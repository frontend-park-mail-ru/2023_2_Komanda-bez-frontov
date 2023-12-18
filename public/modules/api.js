import {backendUrl, ROUTES_API} from '../config.js';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const DELETE_METHOD = 'DELETE';
const PUT_METHOD = 'PUT';

const defaultErrorMessage = 'Ошибка сервера. Перезагрузите страницу или попробуйте позже.'

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
        // TODO когда на беке появится!
        // localStorage.setItem('csrf-token', res.headers.get('x-csrf-token'));
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

      localStorage.setItem('csrf-token', res.headers.get('x-csrf-token'));

      let message = defaultErrorMessage;

      const body = await res.json();

      if (res.status === 200) {
        return {message: 'ok', authorizedUser: body.data};
      }
      if (res.status === 450) {
        return {message: 'Нет подключения к сети', authorizedUser: null};
      }
      if (body.data.errors[0].status === 'already logged in') {
        message = 'Невозможно выполнить вход. Завершите предыдущую сессию!';
      }
      if (body.data.errors[0].status === 'rpc error: code = NotFound desc = login credentials are wrong'
            || body.data.errors[0].status === 'rpc error: code = NotFound desc = invalid username or password') {
        message = 'Неправильный логин или пароль';
      }

      return {message, authorizedUser: null};
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
        headers: {
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
        },
        credentials: 'include',
      });
      if (res.status === 450) {
        return {message: 'Нет подключения к сети'};
      }

      localStorage.removeItem('csrf-token');

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

      localStorage.setItem('csrf-token', res.headers.get('x-csrf-token'));

      const body = await res.json();

      const registeredUser = body.data;
      let message = defaultErrorMessage;

      if (res.ok) {
        return {message: 'ok', registeredUser};
      }
      if (body.data.errors[0].status === 'rpc error: code = Canceled desc = email taken') {
        message = 'Пользователь с такой почтой уже существует';
      }
      if (body.data.errors[0].status === 'rpc error: code = Canceled desc = username taken') {
        message = 'Пользователь с таким username уже существует';
      }
      if (body.data.errors[0].status === 'already logged in') {
        message = 'Невозможно зарегистрироваться. Завершите предыдущую сессию!';
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
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
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

      let message = defaultErrorMessage;
      const body = await res.json();

      if (res.ok) {
        const updatedUser = body.data;
        return {message: 'ok', updatedUser};
      }
      if (body.data.errors[0].status === 'rpc error: code = Unknown desc = invalid password') {
        message = 'Введен неправильный пароль';
      }
      if (body.data.errors[0].status ===  'rpc error: code = Unknown desc = current user differs from searched one') {
        message = 'Пользователь с такими email/username уже существует';
      }

      return {message, updatedUser: null};
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

      return {message: defaultErrorMessage, forms: null};
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

      return {message: defaultErrorMessage, forms: null};
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

      return {message: defaultErrorMessage, form: null};
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

      return {message: defaultErrorMessage, avatar: null};
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
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
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

      return {message: defaultErrorMessage, form: null};
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
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
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

      return {message: defaultErrorMessage, form: null};
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
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
        },
        credentials: 'include',
      });

      if (res.status === 450) {
        return {message: 'Нет подключения к сети'};
      }
      if (res.ok) {
        return {message: 'ok'};
      }
      if (res.status === 404) {
        return {message: 'Опрос не удалось обнаружить: уже удален.'};
      }

      return {message: defaultErrorMessage};
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

      return {message: defaultErrorMessage, formResults: null};
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
          'X-CSRF-Token': localStorage.getItem('csrf-token'),
        },
        credentials: 'include',
        body: JSON.stringify(passageJSON),
      });

      if (res.ok) {
        return {message: 'ok'};
      }

      const body = await res.json();

      if (body.data.errors[0].status === 'rpc error: code = Unknown desc = error validating answer: answer to non-existent question was given') {
        return {message: 'Введены невалидные данные', form: null};
      }

      if (res.status === 400) {
        return {message: 'Пользователь не авторизирован для прохождения опроса', form: null};
      }

      if (res.status === 450) {
        return {message: 'Нет подключения к сети', form: null};
      }

      return {message: defaultErrorMessage, form: null};
    } catch (e) {
      // TODO убрать к РК4
      console.log('Ошибка метода passageForm:', e);
      throw (e);
    }
  }
}
