'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ordersItems', [{
      order_id: 1,
      item_id: 1,
      // is_removed: false,
      createdAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('ordersItems', [{
      order_id: 2,
      item_id: 2,
      // is_removed: false,
      createdAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
