'use strict';
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let userId = await queryInterface.bulkInsert('Users', [
      {
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: SEED_USER.password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})

    await queryInterface.bulkInsert('Todos',
      Array.from({ length: 10 }, (_, i) => {
        return {
          name: `name-${i}`,
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
      , {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
