var express = require('express');
var router = express.Router();
const elasticSchema = require('../db/schemas/elasticSchema.js');
const elasticSearch = require('../controller/elasticController.js');

router.get('/search/:index/:type/:field/:value', function(req, res, next) {
  var index = req.params.index.toString();
  var type = req.params.type.toString();
  var field = req.params.field.toString();
  var value = req.params.value.toString();
  elasticSearch.searchSuggestions(index, type, field, value).then(function(result) {
    res.json(result);
  }, function(err) {
    res.json(err);
  });
});

//FIND USERS
//http://localhost:2300/api/search/tags/user/userID/2
//FIND TAGS
//http://localhost:2300/api/search/tags/user/tag/fishing

router.post('/addTag/:userId/:username/:type/:tag/:index', function(req, res, next) {
  var userId = req.params.userId.toString();
  var username = req.params.username.toString();
  var type = req.params.type.toString();
  var tag = req.params.tag.toString();
  var index = req.params.index.toString();
  elasticSearch.addDocument(userId, username, type, tag, index).then(function(result) { res.json(result);
  }, function(err) {
    res.json(err);
  });
});

// elasticSearch.deleteIndex("tags");
elasticSearch.addDocument("customer notes");
elasticSearch.documentCount("customer aotes");
elasticSearch.searchSuggestions("tags", "expert", "tag", "Amazing"); //index, type, field, value

module.exports = router;
