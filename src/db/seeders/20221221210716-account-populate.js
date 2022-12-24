'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account', [{
      name: "Checkings Bank of America",
      type: "Checkings",
      bank: "Bank of America",
      description: "My checkigs account",
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Savings Mercury",
      type: "Savings",
      bank: "Mercury",
      description: "My savings account for investing",
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('account', null, {});
  }
};
