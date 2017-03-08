var elasticClient = require('../db/connections.js').elasticClient;

module.exports = {
  deleteIndex: function(indexToDelete) {
    return elasticClient.indices.delete({ index: indexToDelete }, function(err, resp, status) {
      console.log("delete", resp);
    });
  },
  createIndex: function(indexToCreate) {
    return elasticClient.indices.create({ //an index is aplace to store related documeents in ES
      index: indexToCreate //we can store different types of documents in this 'index'
    }, function(err, resp, status) { //every field is indexed by default
      if (err) {
        console.log(err);
      } else {
        console.log("create", resp);
      }
    });
  },
  indiceMapping: function() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "expert",
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
  indexExists: function(indexToCheck) {
    return elasticClient.indices.exists({
      index: indexToCheck
    });
  },
  addDocument: function(userId, username, type, tag, index) {
    return elasticClient.index({
      index: index,
      type: type,
      body: {
        "userName": username,
        "userID": userId,
        "userType": type,
        "tag": tag
      }
    }).then(function(response) {
        return response;
      },
      function(error) {
        console.trace(error.message);
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
      "from": 0,
      "size": 20,
      body: {
        query: {
          match: {
            [`${field}`]: value
          }
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

