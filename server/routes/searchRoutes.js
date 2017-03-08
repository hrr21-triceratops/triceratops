var express = require('express');
var router = express.Router();
const elasticSearch = require('../db/schemas/elasticSchema.js');

/* GET suggestions */
router.get('/search/:tag', function (req, res, next) {
  elasticSearch.searchSuggestions(req.params.input).then(function (tag) { res.json(tag); });
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {
  elasticSearch.addDocument(req.body).then(function (result) { res.json(result); });
});

module.exports = router;
