var mongoose = require('../connections.js').mongoose;
console.log('mongoose', mongoose);

var chatSchema = mongoose.Schema({
  to: String,
  from: String,
  message: String
});

var chatModel = mongoose.model('chatSchema', chatSchema);

module.exports  = chatModel;