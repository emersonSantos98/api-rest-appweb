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
    await queryInterface.bulkInsert('Permissions', [
      {
        actions: 'create',
        subjects: 'Auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        actions: 'read',
        subjects: 'Auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        actions: 'update',
        subjects: 'Auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        actions: 'delete',
        subjects: 'Auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        actions: 'manage',
        subjects: 'all',
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
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
