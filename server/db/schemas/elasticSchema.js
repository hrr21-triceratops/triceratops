var elasticClient = require('../connections.js').elasticClient;
var index = "tags";

module.exports = {
  deleteIndex: function() {
    return elasticClient.indices.delete({ index: index }, function(err, resp, status) {
      console.log("delete", resp);
    });
  },
  createIndex: function() {
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
  indexExists: function() {
    return elasticClient.indices.exists({
      index: index
    });
  },
  initMapping: function() {
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
  addDocument: function(input) {
    return elasticClient.index({
      index: index,
      id: "1",
      type: "tags",
      body: {
        tags: input,
        suggest: {
          input: input.split(" "),
          output: input,
          payload: input || {}
        }
      }
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
  searchSuggestions: function(input) {
    return elasticClient.search({
      q: input
    }).then(function(body) {
      console.log('body', body);
      var hits = body.hits.hits;
      return hits;
    }, function(error) {
      console.trace(error.message);
    });
  }
};

//adding data to elasticSearch index