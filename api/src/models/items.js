'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      items.belongsToMany(models.orders, {
        through: 'ordersItems',
        as: 'orders',
        foreignKey: 'item_id'
      });
    }
  }
  items.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};