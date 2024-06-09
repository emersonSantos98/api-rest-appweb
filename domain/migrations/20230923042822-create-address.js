'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pais: {
        type: Sequelize.STRING(2)
      },
      cep: {
        type: Sequelize.STRING(8)
      },
      endereco: {
        type: Sequelize.STRING(100)
      },
      numero: {
        type: Sequelize.STRING(10)
      },
      bairro: {
        type: Sequelize.STRING(50)
      },
      complemento: {
        type: Sequelize.STRING(50)
      },
      cidade: {
        type: Sequelize.STRING(50)
      },
      estado: {
        type: Sequelize.STRING(2)
      },
      org_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Organizations',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};
