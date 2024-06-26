'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('PermissionUserGroups', [
      {
        id_usergroup: 1,
        id_permission: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usergroup: 2,
        id_permission: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usergroup: 2,
        id_permission: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usergroup: 2,
        id_permission: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usergroup: 2,
        id_permission: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PermissionUserGroups', null, {});
  },
};
