var Sequelize = require('sequelize');
var sequelize = require('../connections.js').sequelize;

var userModel = sequelize.define('user', {
<<<<<<< HEAD
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  averageRating: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0},
  shopperExpert: Sequelize.BOOLEAN,
  active: Sequelize.BOOLEAN,
  closedChatSessions: Sequelize.ARRAY(Sequelize.INTEGER),
=======
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: Sequelize.STRING,
  userRating: Sequelize.INTEGER,
>>>>>>> Insert correct api routes into login component
  userPreferences: Sequelize.JSONB
});

userModel.sync({force: false}).then(function () {
  //force true drops table if it exists, so set to false for easy seeding
  console.log('users table created');
});

module.exports = userModel;