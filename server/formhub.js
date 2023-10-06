const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/', 'index.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/', 'main.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/', 'signup.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});