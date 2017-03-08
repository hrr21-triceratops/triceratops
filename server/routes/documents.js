var express = require('express');
var router = express.Router();
const elastic = require('../db/schemas/elasticSchema.js');

/* GET suggestions */
router.get('/search/tag/:tag', function (req, res, next) {
  elastic.searchSuggestions(req.params.input).then(function(tag) {
    console.log('success');
    res.send(tag);
  });
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {
  elastic.addDocument(req.body).then(function (result) { res.json(result); });
});

module.exports = router;