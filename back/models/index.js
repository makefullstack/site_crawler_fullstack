const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.HumorPost = require('./HumorPost')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db.sequelize.models).forEach(modelName => {
  if (!db[modelName]) {
    db[modelName] = db.sequelize.models[modelName];
  }
});

module.exports = db;