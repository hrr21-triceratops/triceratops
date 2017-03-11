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
  getUser: function(userid) {
    var url = connection+'/api/users/' + userid;
    return fetch(url).then((res) => res.json()).then(function(users) {
      console.log('users', users);
      return users;
    });
  },
  getExpertsByTag: function(tag) {
    console.log('get experts by tag');
    var url = 'http://localhost:2300/api/search/tags/expert/tag/'+tag;
    return fetch(url).then((res) => res.json()).then(function(results) {
      console.log('results', results);
      return results;
    });
  },
  addTag: function(userId, username, type, tag) {
    console.log('ADD TAG', userId, username, type, tag)
    var url = 'http://localhost:2300/api/addTag/'+userId+'/'+username+'/'+type+'/'+tag+'/tags';
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
    var url = 'http://localhost:2300/api/search/tags/'+type+'/userID/'+userId;
    return fetch(url).then((res) => res.json()).then(function(tags) {
      console.log('tags', tags);
      return tags;
    });
  }
};

module.exports = api;