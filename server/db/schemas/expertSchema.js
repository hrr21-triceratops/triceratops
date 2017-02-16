var Sequelize = require('sequelize');
var sequelize = require('../connections.js').sequelize;

var expertModel = sequelize.define('expert', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  expertName: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  expertRating: Sequelize.INTEGER,
  expertise: Sequelize.JSONB,
  expertAvailable: Sequelize.BOOLEAN
});

expertModel.sync({force: false}).then(function () {
  //force true drops table if it exists, so set to false for easy seeding
  console.log('experts table created');
});

module.exports = expertModel;