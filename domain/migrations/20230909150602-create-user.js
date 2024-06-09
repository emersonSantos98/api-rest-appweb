'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING(50),
      },
      first_name: {
        type: Sequelize.STRING(191),
      },
      last_name: {
        type: Sequelize.STRING(191),
      },
      email: {
        type: Sequelize.STRING(191),
      },
      password: {
        type: Sequelize.STRING(191),
      },
      two_factor: {
        type: Sequelize.TINYINT,
      },
      date_two_factor: {
        type: Sequelize.STRING(30),
      },
      user_group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserGroups',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      DeletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
