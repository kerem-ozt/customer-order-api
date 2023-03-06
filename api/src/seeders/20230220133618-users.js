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
    await queryInterface.bulkInsert('users', [{
      name: 'kerem',
      password: '202cb962ac59075b964b07152d234b70',
      //is_removed: false,
      createdAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      password: '202cb962ac59075b964b07152d234b70',
      //is_removed: false,
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
