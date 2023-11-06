const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME_BACKEND = process.env.HOSTNAME_BACKEND || 'http://localhost:8080';

app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/forms/', express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
