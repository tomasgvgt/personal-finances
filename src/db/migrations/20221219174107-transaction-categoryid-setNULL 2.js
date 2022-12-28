'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.sequelize.query("ALTER TABLE transaction DROP CONSTRAINT transaction_category_id_fkey")
  await queryInterface.sequelize.query("ALTER TABLE transaction ADD CONSTRAINT transaction_category_id_fkey FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE transaction DROP CONSTRAINT transaction_category_id_fkey")
    await queryInterface.sequelize.query("ALTER TABLE transaction ADD CONSTRAINT transaction_category_id_fkey FOREIGN KEY (category_id) REFERENCES category(id)")
  }
};
