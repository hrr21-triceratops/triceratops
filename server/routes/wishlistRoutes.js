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

// DELETE ITEM FROM WISHLIST
router.delete('/wishlist/:id', function (req, res) {
  wishlistModel.remove({_id: req.params.id}, function (err) {
    if (err) {
      console.error(err);
    } else {
      res.send(JSON.stringify('Item Deleted.'));
    }
  });
});

module.exports = router;