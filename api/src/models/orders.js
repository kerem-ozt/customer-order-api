'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.customers, {
        foreignKey: 'customer_id',
        as: 'customer'
      });
      // db.customers.hasMany(orders, {
      //   foreignKey: 'customer_id',
      //   as: 'orders'
      // });
      orders.belongsToMany(models.items, {
        through: 'ordersItems',
        as: 'items',
        foreignKey: 'order_id'
      });
    }
  }
  orders.init({
    date: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};