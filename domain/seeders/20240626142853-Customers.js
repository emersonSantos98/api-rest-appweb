'use strict';
const { generateUUID } = require('../../utils/uuidGenerator');
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
    await queryInterface.bulkInsert('Customers', [
      {
        uuid: await generateUUID(),
        user_id: 2,
        name: 'Emerson',
        typeDocument: 'f',
        cellphone: '11 99999-9999',
        document: '051.534.640-32',
        status: 1,
        popup_notification: false,
        birth_date: '1990-01-01',
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
  },
};
