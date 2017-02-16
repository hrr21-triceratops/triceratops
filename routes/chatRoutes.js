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
  "userId": req.body.userId,
  "expertId": req.body.expertId,
  "message": req.body.message
  }, function(err, newMessageAdded) {
    res.send(newMessageAdded);
  });
});

module.exports = router;
