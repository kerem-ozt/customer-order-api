'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ordersItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ordersItems.init({
    order_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ordersItems',
  });
  return ordersItems;
};