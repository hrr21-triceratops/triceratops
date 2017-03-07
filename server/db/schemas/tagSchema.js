var elasticClient = require('../connections.js').elasticClient;
var indexName = "randomindex";

module.exports = {
  deleteIndex: function() {
    return elasticClient.indices.delete({
      index: indexName
    });
  },
  initIndex: function() {
    return elasticClient.indices.create({
      index: indexName
    });
  },
  indexExists: function() {
    return elasticClient.indices.exists({
      index: indexName
    });
  },

  initMapping: function() {
    return elasticClient.indices.putMapping({
      index: indexName,
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
  addDocument: function(document) {
    return elasticClient.index({
      index: indexName,
      type: "document",
      body: {
        title: document.title,
        content: document.content,
        suggest: {
          input: document.title.split(" "),
          output: document.title,
          payload: document.metadata || {}
        }
      }
    });
  },
  getSuggestions: function(input) {
    return elasticClient.suggest({
      index: indexName,
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
    elasticClient.search({
      q: input
    }).then(function(body) {
      var hits = body.hits.hits;
    }, function(error) {
      console.trace(error.message);
    });
  }
};
