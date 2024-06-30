'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      calculation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Calculations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      free_shipping_program: {
        type: Sequelize.STRING,
      },
      marketplace_commission: {
        type: Sequelize.DECIMAL,
      },
      tax_rate: {
        type: Sequelize.DECIMAL,
      },
      other_fees: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('Parameters');
  },
};
