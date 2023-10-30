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
    name: 'Алекс',
    username: 'user',
    email: 'aa@aa.ru',
    password: 'password',
  },
};
const ids = {};

app.get('/main', (req, res) => {
  console.log(req.cookies)
  const id = req.cookies['podvorot'];
  const emailSession = ids[id];
  if (!emailSession || !users[emailSession]) {
    return res.status(401).json({error: 'Пользователь не авторизован!'});
  }

  const currentUser = users[emailSession]
  return res.status(200).json({id, currentUser});
});

app.post('/login',  (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль.'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль.'});
  }

  const id = uuid();
  ids[id] = email;

  const currentUser = users[email]

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id, currentUser});

});

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const repeat_password = req.body.repeat_password;

  // if (!password || !email || !name || !username || !repeat_password) {
  //   return res.status(400).json({error: 'Вы ввели не все данные.'});
  // }
  //
  // if (!username.match(/^[A-Za-z]+$/)) {
  //   return res.status(400).json({error: 'Неправильный формат ввода для пароля.'});
  // }
  //
  // if (!email.match(/@/)) {
  //   return res.status(400).json({error: 'Неправильный формат ввода для почтиы.'});
  // }
  //
  // if (password !== repeat_password) {
  //   return res.status(400).json({error: 'Введенные пароли не совпадают.'});
  // }

  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует.'});
  }

  const id = uuid();
  const user = {name, username, email, password};
  const currentUser = user;
  ids[id] = email;
  users[email] = user;


  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id, currentUser, message: "Вы успешно зарегистрировались!"});
});

app.get('/logout',  (req, res) => {
  const id = req.cookies['podvorot'];
  if (ids[id]) {
    delete ids[id];
    res.clearCookie('podvorot')
    return res.status(401).json({error: 'Пользователь не авторизован!'});
  }
  return res.status(404).json({error: 'Сессия не найдена!'});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
