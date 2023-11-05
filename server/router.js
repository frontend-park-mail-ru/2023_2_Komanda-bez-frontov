const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');

const router = express.Router({ strict: true });

router.use(morgan('dev'));
router.use('/', express.static(path.resolve(__dirname, '../public')));
router.use('/forms/', express.static(path.resolve(__dirname, '../public')));
router.use(body.json());
router.use(cookie());

const users = {
  'aa@aa.ru': {
    name: 'Алекс',
    username: 'user',
    email: 'aa@aa.ru',
    password: 'password',
  },
};
const ids = {};
const forms = {
  1: {
    title: 'Форма опроса номер один!',
  },
  2: {
    title: 'Форма опроса номер два!',
  },
  3: {
    title: 'Форма опроса номер три!',
  },
  4: {
    title: 'Форма опроса номер четыре!',
  },
  5: {
    title: 'Форма опроса номер пять!',
  },
  6: {
    title: 'Форма опроса номер шесть!',
  },
  7: {
    title: 'Форма опроса номер семь!',
  },
};

router.get('/main', (req, res) => {
  console.log(req.cookies);
  const id = req.cookies.podvorot;
  const emailSession = ids[id];
  if (!emailSession || !users[emailSession]) {
    return res.status(401).json({error: 'Пользователь не авторизован!'});
  }

  const currentUser = users[emailSession];
  return res.status(200).json({id, currentUser});
});

router.post('/login', (req, res) => {
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

  const currentUser = users[email];

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id, currentUser});
});

router.post('/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует.'});
  }

  const id = uuid();
  const user = {
    name, username, email, password,
  };
  const currentUser = user;
  ids[id] = email;
  users[email] = user;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id, currentUser, message: 'Вы успешно зарегистрировались!'});
});

router.get('/logout', (req, res) => {
  const id = req.cookies.podvorot;
  if (ids[id]) {
    delete ids[id];
    res.clearCookie('podvorot');
    return res.status(401).json({error: 'Пользователь не авторизован!'});
  }
  return res.status(404).json({error: 'Сессия не найдена!'});
});

router.get('/api/forms', (req, res) => {
  if (forms.length === 0) {
    return res.status(404).json({error: 'Опросов нет...'});
  }
  return res.status(200).json({forms});
});

router.get('/api/forms/:id', (req, res) => {
  const id = req.params.id;
  if (!forms[id]) {
    return res.status(404).json({error: 'Опрос не найден'});
  }
  const form = forms[id];
  return res.status(200).json({form});
});

router.get('/forms', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
