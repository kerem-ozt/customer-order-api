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
  await queryInterface.bulkInsert('permissions', [{
    permission: 'getOrder',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'deleteOrder',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'createOrder',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'getItem',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'deleteItem',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'createItem',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'getCustomer',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('permissions', [{
    permission: 'deleteCustomer',
    is_removed: false,
    createdAt: new Date(),
    updatedAt: new Date()
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
