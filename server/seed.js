const fs = require('fs');
const userModel = require('./db/schemas/userSchema.js');
const expertModel = require('./db/schemas/expertSchema.js');
const chatModel = require('./db/schemas/chatSchema.js');

//mongo

chatModel.remove({}, function(err) {
  console.log('chatModel removed');
});

//pg

expertModel.destroy({
  where: {},
  truncate: true
});

userModel.destroy({
  where: {},
  truncate: true
});

fs.readFile(__dirname + '/db/seedData/chatData.json', function(err, messages) {
  if (err) throw err;
  JSON.parse(messages).forEach(function(message) {
    chatModel.create(message, function(err, newMessageAdded) {
      if (err) throw err;
      console.log('New Message Added', newMessageAdded);
    });
  });
});

fs.readFile(__dirname + '/db/seedData/userData.json', function(err, users) {
  if (err) throw err;
  JSON.parse(users).forEach(function(user) {
    console.log('user', user);
    userModel.create(user, function(err, newUserAdded) {
      if (err) throw err;
      console.log('New User Added', newUserAdded);
    });
  });
});

fs.readFile(__dirname + '/db/seedData/expertData.json', function(err, experts) {
  if (err) throw err;
  JSON.parse(experts).forEach(function(expert) {
    expertModel.create(expert, function(err, newExpertAdded) {
      if (err) throw err;
      console.log('New Expert Added', newExpertAdded);
    });
  });
});
