'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction', [{
        type: "expense",
        amount: 500,
        category_id: 2,
        account_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
      type: "income",
      amount: 1000,
      category_id: 1,
      account_id: 2,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
  }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transaction', null, {});
  }
};
