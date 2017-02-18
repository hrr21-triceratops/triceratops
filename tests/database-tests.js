var chai = require('chai');
var chaiHttp = require('chai-http')
// var server = require('../server/server.js');
chai.use(chaiHttp);

describe('api/users', function(){
  it('it should get all the users', function(){
    chai.assert.isDefined(chai.request('http://localhost:2300').get('api/users'), 'no users are defined');
  });
});

var dummyTest = (function(){
  if(1 + 1 === 2){
    console.log("\'Test\' test passes");
  } else {
    throw new Error("We got trouble, right here in River City");
  }
})();