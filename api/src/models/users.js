'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // users.hasOne(models.customers, {
      //   foreignKey: 'id',
      //   as: 'customer'
      // });
      users.hasMany(models.orders, {
        foreignKey: 'customer_id',
        as: 'orders'
      });
      users.belongsToMany(models.userRoles, {
        through: 'userUserRoles',
        as: 'userRoles',
        foreignKey: 'userId'
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};