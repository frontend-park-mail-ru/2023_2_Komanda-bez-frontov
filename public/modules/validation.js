/**
 * Эта функция проверяет, является ли введёный email валидным.
 * @param {string} email - Введённый пользователем email.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export function emailValidation(email) {
  let valid = false;

  if (email.length >= 255) {
    const message = 'Email не должен содержать более 50 символов';
    return {valid, message};
  }

  if (!email.includes('@')) {
    const message = 'Email должен содержать символ @';
    return {valid, message};
  }

  if (email.split('@').length - 1 >= 2) {
    const message = 'Email должен содержать только один символ @';
    return {valid, message};
  }

  valid = true;
  return {valid, message: ''};
}

/**
 * Эта функция проверяет, является ли введённое имя пользователя валидным.
 * @param {string} username - Введённый пользователем username.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export function usernameValidation(username) {
  let valid = false;

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    const message = 'Имя пользователя должно содержать только буквы и цифры';
    return { valid, message };
  }

  if (username.length < 4) {
    const message = 'Username должен содержать более 4 символов';
    return {valid, message};
  }

  if (username.length >= 50) {
    const message = 'Имя пользователя не должно содержать более 50 символов';
    return {valid, message};
  }

  valid = true;
  return {valid, message: ''};
}

/**
 * Эта функция проверяет, является ли введёный password валидным.
 * @param {string} password - Введённый пользователем password.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export function passwordValidation(password) {
  let valid = false;

  if (password.length < 8) {
    const message = 'Пароль должен содержать не менее 8 символов';
    return {valid, message};
  }

  if (password.length >= 50) {
    const message = 'Пароль не должен содержать более 50 символов';
    return {valid, message};
  }

  if (!/[a-z]/.test(password)) {
    const message = 'Пароль должен содержать хотя бы одну букву в нижнем регистре';
    return {valid, message};
  }

  valid = true;
  return {valid, message: ''};
}
