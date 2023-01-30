'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [{
      email: 'Shazib@gmail.com',
      password: "s-pass"
    },
    {
      email: 'digvijay@gmail.com',
      password: "d-pass"
    },
    {
      email: 'nihla@gmail.com',
      password: "n-pass"
    },
    {
      email: 'Abhisek@gmail.com',
      password: "a-pass"
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
