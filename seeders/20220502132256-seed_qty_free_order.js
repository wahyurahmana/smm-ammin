'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('LimitTrxFrees', [{
     qty : 7,
     createdAt : new Date(),
     updatedAt : new Date()
   }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LimitTrxFrees', null, {
      truncate: true,
      cascade : true,
      restartIdentity : true
    });
  }
};
