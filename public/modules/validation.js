/**
 * Эта функция проверяет, является ли введёное имя валидным.
 * @param {string} name - Введённое пользователем имя.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const nameValidation = (name) => {
  let valid = false;

  if (!/^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*(?:\s[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*)*$/.test(name) ) {
    const message = 'Имя должно состоять из русских или английских букв';
    return { valid, message };
  }

  valid = true;
  return {valid, message: ''};
};

/**
 * Эта функция проверяет, является ли введёный email валидным.
 * @param {string} email - Введённое пользователем email.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const emailValidation = (email) => {
  let valid = false;

  if (email.length >= 255) {
    const message = 'Email не должен содержать более 255 символов';
    return {valid, message};
  }

  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) ||
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]+$/.test(email)) {
    const message = 'Неправильный формат ввода почты, пример: example@example.ru';
    return { valid, message };
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
};

/**
 * Эта функция проверяет, является ли введённое имя пользователя валидным.
 * @param {string} username - Введённый пользователем username.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const usernameValidation = (username) => {
  let valid = false;

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    const message = 'Имя пользователя должно содержать только латинские буквы и цифры';
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
};

/**
 * Эта функция проверяет, является ли введёный password валидным.
 * @param {string} password - Введённый пользователем password.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const passwordValidation = (password) => {
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
};

/**
 * Эта функция проверяет, является ли загруженный аватар валидным.
 * @param {file} avatar - Загруженный файл с аватаром.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const avatarValidation = (avatar) => {
  let valid = false;

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  const fileExtension = avatar.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    const message = `Пожалуйста, выберите файл с расширением: ${allowedExtensions.join(', ')}`;
    return {valid, message};
  }

  const maxSize = 5;
  const fileSize = avatar.size / 1024 / 1024;

  if (fileSize > maxSize) {
    const message = `Пожалуйста, выберите файл размером не более ${maxSize} MB`;
    return {valid, message};
  }

  valid = true;
  return {valid, message: ''};
};

/**
 * Эта функция проверяет, является ли введёный текст валидным.
 * @param {string} text - Введённый пользователем текст.
 * @return {object} - Объект с полем `valid` (true/false) и с полем
 * `message` (сообщение об ошибке).
 */
export const textValidation = (text) => {
  let valid = false;

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if ((charCode >= 255 && charCode < 1025) || charCode > 1105) {
      const message = 'Текст должен состоять из русских или английских слов, цифр и знаков препинания';
      return {valid, message};
    }
  }

  valid = true;
  return {valid, message: 'Проверка валидации форм'};
};