const elasticSearch = require('../../controller/elasticController.js');

elasticSearch.indexExists("tags").then(function(exists) {
  if (!exists) {
    elasticSearch.createIndex("tags");
  } else {
    console.log('Index already exists!');
    return true;
  }
});