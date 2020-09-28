const { Parma } = require('./utils/Parma');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ParmaCity = {
      city_name: 'parma city',
      boundaries: Sequelize.fn(
        'ST_GeomFromGeoJSON',
        JSON.stringify(Parma.geometry)
      ),
      created_at: new Date(),
      updated_at: new Date(),
    };

    return queryInterface.bulkInsert('cities', [ParmaCity], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('cities', null, {});
  },
};
