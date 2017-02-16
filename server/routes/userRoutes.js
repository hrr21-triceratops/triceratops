var express = require('express');
var router = express.Router();
const userModel = require('../db/schemas/userSchema.js');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/users', function(req, res) {
  userModel.findAll().then(function(users) {
     res.json(users);
  });
});

module.exports = router;
