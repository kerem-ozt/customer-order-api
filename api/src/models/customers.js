'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customers.hasMany(models.orders, {
        foreignKey: 'customer_id',
        as: 'orders'
      });
      customers.belongsTo(models.users, {
        foreignKey: 'id',
        as: 'user'
      });
      // db.orders.belongsTo(customers, {
      //   foreignKey: 'customer_id',
      //   as: 'customer'
      // });
    }
  }
  customers.init({
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};