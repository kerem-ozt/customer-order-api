'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userRoles.belongsToMany(models.users, {
        through: 'userUserRoles',
        as: 'users',
        foreignKey: 'userRoleId'
      });
      userRoles.belongsToMany(models.permissions, {
        through: 'rolesPermissions',
        as: 'permissions',
        foreignKey: 'roles_id'
      });
    }
  }
  userRoles.init({
    role: DataTypes.STRING,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userRoles',
  });
  return userRoles;
};