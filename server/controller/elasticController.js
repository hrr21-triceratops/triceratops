var elasticClient = require('../db/connections.js').elasticClient;

module.exports = {
  deleteIndex: function(indexToDelete) {
    return elasticClient.indices.delete({ index: indexToDelete }, function(err, resp, status) {
    });
  },
  createIndex: function(indexToCreate) {
    return elasticClient.indices.create({
      index: indexToCreate
    }, function(err, resp, status) {
      if (err) {
        console.log(err);
      } else {
        console.log("create", resp);
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
    });
  },
  searchSuggestions: function(index, type, field, value) {
    return elasticClient.search({
      index: index,
      type: type,
      "from": 0,
      "size": 50,
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
