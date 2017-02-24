var express = require('express');
var router = express.Router();
const chatModel = require('../db/schemas/chatSchema.js');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/chat/messages', function(req, res) {
  console.log('Finding messages...');
  chatModel.find({}, function(err, messages) {
    res.send(messages);
  });
});

// SAVE MESSAGES TO DATABASE (Expects Array of Chat Objects)
router.post('/chat/messages', function(req, res) {
  var messages = req.body; // Array of Chat Objects

  messages.forEach(function(message) {
    chatModel.create(message, function(err, savedMessage) {
      if (err) throw err;
    });
  });

  res.send('Messages Saved.');
});

module.exports = router;
