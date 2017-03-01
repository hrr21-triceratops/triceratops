var api = {
  getExperts(category) {
    console.log('getExperts', category);
    var cat = category.toLowerCase().trim();
    var url = `http://localhost:2300/api/users/topActiveExperts/${cat}/5`;
    return fetch(url).then((res) => res.json()).then(function(results) {
      console.log('results', results);
      return results;
    });
  }
};


module.exports = api;