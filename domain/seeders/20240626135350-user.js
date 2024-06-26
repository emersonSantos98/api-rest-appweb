'use strict';
const { generateUUID } = require('../../utils/uuidGenerator');
const { hashPassword } = require('../../utils/utilities');
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
    await queryInterface.bulkInsert('Users', [
      {
        uuid: await generateUUID(),
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('@123456'),
        user_group_id: 1,
        two_factor: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: await generateUUID(),
        first_name: 'emerson',
        last_name: 'Santos',
        email: 'emerson@gmail.com',
        password: await hashPassword('@123456'),
        user_group_id: 2,
        two_factor: false,
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
    await queryInterface.bulkDelete('Users', null, {});
  },
};
