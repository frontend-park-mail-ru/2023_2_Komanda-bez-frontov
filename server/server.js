const express = require('express');
const router = require('./router');

const app = express();

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
