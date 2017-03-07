var express = require('express');
var router = express.Router();
const elasticTagModel = require('../db/schemas/tagSchema.js');

/* GET suggestions */
router.get('/suggest/:input', function (req, res, next) {
  elasticTagModel.getSuggestions(req.params.input).then(function (result) { res.json(result) });
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {
  elasticTagModel.addDocument(req.body).then(function (result) { res.json(result) });
});
