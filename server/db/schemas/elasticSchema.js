var elasticClient = require('../connections.js').elasticClient;
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
  initMapping: function(indexToInit) {
    return elasticClient.indices.putMapping({
      index: index,
      type: "document",
      body: {
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          suggest: {
            type: "completion",
            analyzer: "simple",
            search_analyzer: "simple",
            payloads: true
          }
        }
      }
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
  getSuggestions: function(input) {
    return elasticClient.suggest({
      index: index,
      type: "document",
      body: {
        docsuggest: {
          text: input,
          completion: {
            field: "suggest",
            fuzzy: true
          }
        }
      }
    });
  },
  documentCount: function(indexToCount) {
    return elasticClient.count({ index: 'tags', type: 'user' }, function(err, resp, status) {
      console.log("users", resp);
    });
  },
  searchSuggestions: function(index, type, field, value) {
    elasticClient.search({
      index: index,
      type: type,
      body: {
        query: {
          match: { [`${field}`]: value }
        },
      }
    }, function(error, response, status) {
      if (error) {
        console.log("search error: " + error);
      } else {
        console.log("--- Response ---");
        console.log(response);
        console.log("--- Hits ---");
        response.hits.hits.forEach(function(hit) {
          console.log(hit);
        });
      }
    });
  }
};
