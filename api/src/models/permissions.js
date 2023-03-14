'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      permissions.belongsToMany(models.userRoles, {
        through: 'rolesPermissions',
        as: 'userRoles',
        foreignKey: 'permission_id'
      });
    }
  }
  permissions.init({
    permission: DataTypes.STRING,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};