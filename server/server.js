import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;
// const HOSTNAME_BACKEND = process.env.HOSTNAME_BACKEND || 'http://localhost:8080';

const __dirname = path.resolve();
app.use('/', express.static(path.resolve(__dirname, './public')));
app.use('/forms/', express.static(path.resolve(__dirname, '..', 'public')));
app.use('/forms/[0-9]+', express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
