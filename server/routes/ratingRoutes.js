var express = require('express');
var router = express.Router();
const ratingModel = require('../db/schemas/ratingSchema.js');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/ratings', function(req, res) {
  ratingModel.findAll().then(function(ratings) {
     res.json(ratings);
  });
});

module.exports = router;
