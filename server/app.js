const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const { db } = require('./db');

const app = express();

// logging middleware
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api'));

const start = async () => {
  const PORT = 8080;
  await db.sync();
  app.listen(PORT, err => {
    if (err) console.error(err);
    else console.log('server is listening on port', PORT);
  });
};

start();
