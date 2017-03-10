var mongoose = require('../connections.js').mongoose;

var wishlistSchema = mongoose.Schema({
  title: { type: String },
  price: { type: String },
  comment: { type: String },
  image: { type: String },
  expert: { type: String },
  userId: { type: Number }
});

var wishlistModel = mongoose.model('wishlistSchema', wishlistSchema);

module.exports  = wishlistModel;