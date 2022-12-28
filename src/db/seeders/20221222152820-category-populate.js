'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category', [{
      name: "Investing",
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('user_category', [{
      user_id: 1,
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('category', [{
      name: "Travel",
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('user_category', [{
      user_id: 1,
      category_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('category', [{
      name: "Expenses",
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('user_category', [{
      user_id: 1,
      category_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
    await queryInterface.bulkDelete('user_category', null, {});
  }
};
