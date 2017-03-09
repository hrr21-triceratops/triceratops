let connection = require('./connection');

var api = {
  getExpertsByCategory: function(category) {
    console.log('getExperts', category);
    var cat = category.toLowerCase().trim();
    var url = connection + '/api/users/topActiveExperts/' + cat + '/5';
    return fetch(url).then((res) => res.json()).then(function(results) {
      console.log('results', results);
      return results;
    });
  },
  getExpertsByTag: function(tag) {
    console.log('get experts by tag');
    var url = connection+'/api/search/tags/expert/tag/'+tag;
    return fetch(url).then((res) => res.json()).then(function(results) {
      console.log('results', results);
      return results;
    });
  },
  addTag: function(userId, username, type, tag) {
    console.log('ADD TAG', userId, username, type, tag)
    var url = connection + '/api/addTag/'+userId+'/'+username+'/'+type+'/'+tag+'/tags';
    return fetch(url, {
      method: 'POST'
    }).then((res) => res.json()).then(function(tag) {
      console.log('tag added', tag);
      return tag;
    }).then(function(tag){
      return tag;
    });
  },
  getUserTags: function(type, userId) {
    console.log('error?', type, userId);
    var url = connection + '/api/search/tags/'+type+'/userID/'+userId;
    return fetch(url).then((res) => res.json()).then(function(tags) {
      console.log('tags', tags);
      return tags;
    });
  }
};

module.exports = api;