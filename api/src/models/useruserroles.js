'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userUserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userUserRoles.init({
    userId: DataTypes.INTEGER,
    userRoleId: DataTypes.INTEGER,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userUserRoles',
  });
  return userUserRoles;
};