var express = require('express');
var router = express.Router();
const wishlistModel = require('../db/schemas/wishlistSchema.js');

// GET ALL WISHLIST ITEMS FOR SPECIFIC USER
router.get('/wishlist/:id', function (req, res) {
  wishlistModel.find({userId: req.params.id}, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
});

// SAVE WISHLIST ITEM
router.post('/wishlist', function (req, res) {
  wishlistModel.create(req.body.item, function (err, item) {
    if (err) {
      console.log(err);
    } else {
      res.send(item);
    }
  });
});

module.exports = router;