var express = require('express');
var router = express.Router();
const elasticSchema = require('../db/schemas/elasticSchema.js');
const elasticSearch = require('../controller/elasticController.js');

/* GET suggestions */
router.get('/search/:index/:type/:field/:value', function (req, res, next) {
  var index = req.params.index.toString();
  var type = req.params.type.toString();
  var field = req.params.field.toString();
  var value = req.params.value.toString();
  elasticSearch.searchSuggestions(index, type, field, value).then(function(result) {
    res.json(result);
  });
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {
  elasticSearch.addDocument(req.body).then(function (result) { res.json(result); });
});

elasticSearch.addDocument("customer notes");
elasticSearch.documentCount("customer aotes");
elasticSearch.searchSuggestions("tags", "user", "tag", "Amazing"); //index, type, field, value

module.exports = router;
