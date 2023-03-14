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
  //  await queryInterface.bulkInsert('permissions', [{
  //   name: 'create',
  //   is_removed: false,
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'readUser',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'readItem',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  // await queryInterface.bulkInsert('permissions', [{
  //   name: 'update',
  //   is_removed: false,
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }], {});
  // await queryInterface.bulkInsert('permissions', [{
  //   name: 'delete',
  //   is_removed: false,
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }], {});
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
