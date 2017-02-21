var express = require('express');
var router = express.Router();
const chatModel = require('../db/schemas/chatSchema.js');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/chat/messages', function(req, res) {
  chatModel.find({}, function(err, messages) {
    res.send(messages);
  });
});

router.post('/chat/:message', function(req, res) {
  chatModel.create({
    "to": "expert1@abc.com",
    "from": "john@cnet.com",
    "message": "I definitely think that McDonalds is an amazing choice!"
  }, function(err, newMessageAdded) {
    res.send(newMessageAdded);
  });
});

module.exports = router;
