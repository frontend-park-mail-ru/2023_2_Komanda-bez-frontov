
export function emailValidation(email) {
    let isValid = {valid: true, message: ''};

    if (email.length >= 50) {
        isValid = {
            valid: false,
            message: 'Email не должен содержать более 50 символов',
        };
        return isValid;
    }

    if (!email.includes('@')) {
        isValid = {
            valid: false,
            message: 'Email должен содержать символ @',
        };
        return isValid;
    }

    if (email.split('@').length - 1 >= 2) {
        isValid = {
            valid: false,
            message: 'Email должен содержать только один символ @',
        };
        return isValid;
    }

    return isValid;
}


export function usernameValidation(username) {
    let isValid = {valid: true, message: ''};

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        isValid = {
            valid: false,
            message: 'Имя пользователя должно содержать только буквы и цифры',
        };

        return isValid;
    }

    if (username.length < 4) {
        isValid = {
            valid: false,
            message: 'Имя пользователя должно содержать более 4 символов',
        };
        return isValid;
    }

    if (username.length >= 50) {
        isValid = {
            valid: false,
            message: 'Имя пользователя не должно содержать более 50 символов',
        };
        return isValid;
    }

    return isValid;
}


export function passwordValidation(password) {
    let isValid = {valid: true, message: ''};

    if (password.length < 8) {
        isValid = {
            valid: false,
            message: 'Пароль должен содержать не менее 8 символов',
        };
        return isValid;
    }

    if (password.length >= 50) {
        isValid = {
            valid: false,
            message: 'Пароль не должен содержать более 50 символов',
        };
        return isValid;
    }

    if (!/[a-z]/.test(password)) {
        isValid = {
            valid: false,
            message: 'Пароль должен содержать хотя бы одну букву в нижнем регистре',
        };
        return isValid;
    }

    return isValid;
}