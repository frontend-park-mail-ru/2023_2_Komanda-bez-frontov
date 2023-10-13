const express = require('express');
const path = require('path');
const fs = require('fs')


const PORT = 3000;
const IP = '127.0.0.1'

const app = express();

app.use(express.static('public'));

function logger(req, res, next) {
  console.log(`[${Date.now()}] ${req.method} ${req.url}`);
  next()
}

app.use(logger);

// Define route for sending the HTML file
app.get('*', (req, res) => {
  // Read the HTML file from the file system
  const htmlFile = fs.readFileSync(path.join(__dirname, 'public', 'main.html'), 'utf-8');

  // Send the HTML file as a response
  res.send(htmlFile);
});

// Define route for sending the JS file
app.get('/script.js', (req, res) => {
  // Read the JS file from the file system
  const jsFile = fs.readFileSync(path.join(__dirname, 'public', 'main.js'), 'utf-8');

  // Send the JS file as a response
  res.send(jsFile);
});

app.listen(PORT, IP, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on ${IP}:${PORT}`);
  }
});
