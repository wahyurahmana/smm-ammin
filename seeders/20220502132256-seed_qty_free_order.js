'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('LimitTrxFrees', [{
     qty : 7,
     createdAt : new Date(),
     updatedAt : new Date()
   }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('LimitTrxFrees', null, {
      truncate: true,
      cascade : true,
      restartIdentity : true
    });
  }
};
