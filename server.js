const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.static('public'));

function logger(req, res, next) {
  console.log(`[${Date.now()}] ${req.method} ${req.url}`);
  next()
}

app.use(logger);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/main.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/main.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
