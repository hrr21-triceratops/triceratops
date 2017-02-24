var mongoose = require('../connections.js').mongoose;

var chatSchema = mongoose.Schema({
  chatSessionID: { type: String, required: true },
  senderID: { type: Number, required: true },
  receiverID: { type: Number, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

var chatModel = mongoose.model('chatSchema', chatSchema);

module.exports  = chatModel;