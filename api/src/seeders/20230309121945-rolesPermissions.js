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
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 7,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 8,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 4,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 5,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 6,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 1,
      // is_removed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('rolesPermissions', [{
      roles_id: 1,
      permission_id: 2,
      // is_removed: false,
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
