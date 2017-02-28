var api = {
  getExperts(category) {
    var cat = category.toLowerCase().trim();
    var url = `http://localhost:2300/api/users/topActiveExperts/${cat}/5`;
    return fetch(url).then((res) => res.json());
  }
};


module.exports = api;
