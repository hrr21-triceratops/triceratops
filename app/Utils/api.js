let connection = require('./connection');

var api = {
  getExperts(category) {
    console.log('getExperts', category);
    var cat = category.toLowerCase().trim();
    var url = connection + '/api/users/topActiveExperts/' + cat + '/5';
    return fetch(url).then((res) => res.json()).then(function(results) {
      console.log('results', results);
      return results;
    });
  },
  addTag(userId, username, type, tag) {
    var url = connection + '/addTag/'+userId+'/'+username+'/'+type+'/'+tag+'/tags';
    return fetch(url, {
      method: 'POST'
    }).then((res) => res.json()).then(function(tag) {
      console.log('tag added', tag);
      return tag;
    });
  },
  getUserTags(type, userId) {
    var url = connection + '/api/search/tags/'+type+'/userID/'+userId;
    return fetch(url).then((res) => res.json()).then(function(tags) {
      console.log('tags', tags);
      return tags;
    });
  }
};

module.exports = api;