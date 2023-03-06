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
    await queryInterface.bulkInsert('orders', [{
      date: new Date(),
      createdAt: new Date(),
      // is_removed: false,
      customer_id: 1,
    }], {});
    await queryInterface.bulkInsert('orders', [{
      date: new Date(),
      createdAt: new Date(),
      // is_removed: false,
      customer_id: 2,
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
