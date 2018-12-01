const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/test', { logging: false });

module.exports = db;
