'use strict';
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(SEED_USER.password, salt)

      let userId = await queryInterface.bulkInsert('Users', [
        {
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash,
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
    } catch (e) {
      console.warn(e)
    }

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
