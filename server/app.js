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

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const start = async () => {
  const PORT = 8080;
  await db.sync();
  app.listen(PORT, err => {
    if (err) console.error(err);
    else console.log('server is listening on port', PORT);
  });
};

start();
