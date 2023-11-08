# FormHub API

# IsAuth
### request:
Url: /main

Method: GET

Body: no parameters

### response:
```
200
{
    id: '1db87f73-c19f-4a77-9b8b-c02bc29b1d8a',
    currentUser: {
        name: 'Пользователь',
        username: 'user',
        email: 'email@gmail.com',
    }
}

401
{
    error: 'Пользователь не авторизован!'
}
```


# userLogin
### request:
Url: /login

Method: POST

Body:
```
{
    email: 'email@gmail.com',
    password: 'password'
}
```

### response:
```
400
{
    error: 'Не указан E-Mail или пароль.'
}
or
{
    error: 'Не верный E-Mail и/или пароль.'
}

200
{
    id: '1db87f73-c19f-4a77-9b8b-c02bc29b1d8a',
    currentUser: {
        name: 'Пользователь',
        username: 'user',
        email: 'email@gmail.com',
    }
}
```


# userSignup
### request
Url: /register

Method: POST

Body:
```
{
    name: 'Пользователь',
    username: 'user',
    email: 'email@gmail.com',
    password: 'password'
}
```

### response:
```
201
{
    id: '1db87f73-c19f-4a77-9b8b-c02bc29b1d8a',
    currentUser: {
        name: 'Пользователь',
        username: 'user',
        email: 'email@gmail.com',
    }
    message: "Вы успешно зарегистрировались!"
}

400
{
    error: 'Пользователь уже существует.'
}
```


# userLogout
### request:
Url: /logout

Method: GET

Body: no parameters

### response:
```
401
{
    error: 'Пользователь не авторизован!'
}

404
{
    error: 'Сессия не найдена!'
}
```


# getForms
### request:
Url: /api/forms

Method: GET

Body: no parameters

### response:
```
404
{
    error: 'Опросов нет...'
}

200
{
    forms: {
        '1': {
            title: 'Форма опроса номер один!'
        },
        '2': {
            title: 'Форма опроса номер два!',
        },
        ...
    }
}
```


# getForm
### request:
Url: /api/forms/:id

Method: GET

Body: no parameters

### response:
```
404
{
    error: 'Опрос не найден'
}

200
{
    form: {
        '1': {
            title: 'Форма опроса номер один!'
        }
    }
}
```
