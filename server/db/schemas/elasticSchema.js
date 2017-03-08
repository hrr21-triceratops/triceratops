const elasticSearch = require('../../controller/elasticController.js');

//Add Tags Index
elasticSearch.indexExists("tags").then(function(exists) {
  if (!exists) {
    elasticSearch.createIndex();
  } else {
    console.log('Index already exists!');
    return true;
  }
});