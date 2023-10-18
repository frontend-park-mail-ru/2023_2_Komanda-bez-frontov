'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(body.json());
app.use(cookie());

const users = {
  'aa@aa.ru': {
    email: 'aa@aa.ru',
    password: 'password',
  },
};
const ids = {};

app.get('/index', (req, res) => {
  const id = req.cookies['podvorot'];
  const emailSession = ids[id];
  if (!emailSession || !users[emailSession]) {
    return res.status(401).json({error: 'Пользователь не авторизован!'});
  }

  const result = Object
      .values(users)
      .filter(({email}) => email !== emailSession)
  ;

  res.json(result.flat());
});

app.post('/login',  (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id, message: "Вы успешно вошли!"});
});

app.post('/signup', (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (
      !password || !email ||
      !password.match(/^\S{4,}$/) ||
      !email.match(/@/)
  ) {
    return res.status(400).json({error: 'Не валидные данные пользователя'});
  }
  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {password, email};
  ids[id] = email;
  users[email] = user;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id, message: "Вы успешно вошли!"});
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
