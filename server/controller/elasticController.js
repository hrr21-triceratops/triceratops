var elasticClient = require('../db/connections.js').elasticClient;
var index = "tags";

module.exports = {
  deleteIndex: function(indexToDelete) {
    return elasticClient.indices.delete({ index: index }, function(err, resp, status) {
      console.log("delete", resp);
    });
  },
  createIndex: function(indexToCreate) {
    return elasticClient.indices.create({ //an index is aplace to store related documeents in ES
      index: index //we can store different types of documents in this 'index'
    }, function(err, resp, status) { //every field is indexed by default
      if (err) {
        console.log(err);
      } else {
        console.log("create", resp);
      }
    });
  },
  indexExists: function(indexToCheck) {
    return elasticClient.indices.exists({
      index: index
    });
  },
  addDocument: function(documentToAdd) {
    return elasticClient.index({
      index: 'tags',
      id: '1',
      type: 'user',
      body: {
        "userName": "Ipswich",
        "userID": "E14000761",
        "userType": "Borough",
        "tag": "Amazing"
      }
    }, function(err, resp, status) {
      console.log(resp);
    });
  },
  documentCount: function(indexToCount) {
    return elasticClient.count({ index: 'tags', type: 'user' }, function(err, resp, status) {
      console.log("users", resp);
    });
  },
  searchSuggestions: function(index, type, field, value) {
    return elasticClient.search({
      index: index,
      type: type,
      body: {
        query: {
          match: {
            [`${field}`]: value }
        },
      }
    }).then(function(response) {
        return response;
      },
      function(error) {
        console.trace(error.message);
    });
  }
};
