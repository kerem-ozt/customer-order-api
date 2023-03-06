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
    await queryInterface.bulkInsert('customers', [{
      phone: 123456789,
      email: 'customer1@gmail.com',
      // is_removed: false,
      createdAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('customers', [{
      phone: 987654321,
      email: 'customer2@gmail.com',
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
