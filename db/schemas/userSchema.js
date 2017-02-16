var Sequelize = require('sequelize');
var sequelize = require('../connections.js').sequelize;

var userModel = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  userRating: Sequelize.INTEGER,
  userPreferences: Sequelize.JSONB
});

userModel.sync({force: false}).then(function () {
  //force true drops table if it exists, so set to false for easy seeding
  console.log('users table created');
});

module.exports = userModel;