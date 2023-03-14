'use strict';

/**
 * @typedef users
 * @property {integer} id.requerid - User id
 * @property {string} name - User name
 * @property {integer} phone - User phone
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} refresh_token - User refresh token
 * @property {date} createdAt - Created at
 * @property {date} updatedAt - Updated at
 */

/**
 * @typedef orders
 * @property {integer} id.requerid - Order id
 * @property {date} date - Order date
 * @property {integer} customer_id - Customer id
 * @property {date} createdAt - Created at
 * @property {date} updatedAt - Updated at
 */

/**
 * @typedef items
 * @property {integer} id.requerid - Item id
 * @property {string} name - Item name
 * @property {integer} price - Item price
 * @property {date} createdAt - Created at
 * @property {date} updatedAt - Updated at
 */

/**
 * @typedef ordersItems
 * @property {integer} id.requerid - ordersItems id
 * @property {integer} order_id - Order id
 * @property {integer} item_id - Item id
 * @property {date} createdAt - Created at
 * @property {date} updatedAt - Updated at
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/config';
import process from 'process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
