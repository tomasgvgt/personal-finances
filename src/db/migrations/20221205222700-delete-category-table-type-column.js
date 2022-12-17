'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('category', 'type')
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addColumn('category', 'type',
    {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
