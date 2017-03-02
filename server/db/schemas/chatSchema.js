var mongoose = require('../connections.js').mongoose;

var chatSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: {
    _id: { type: Number, required: true },
    name: { type: String, required: true }
  },
  chatSessionID: { type: String, required: true }
});

var chatModel = mongoose.model('chatSchema', chatSchema);

module.exports  = chatModel;