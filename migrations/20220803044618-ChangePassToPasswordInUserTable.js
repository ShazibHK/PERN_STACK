'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('User', 'pass', 'password');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('User', 'password', 'pass');
  }
};
