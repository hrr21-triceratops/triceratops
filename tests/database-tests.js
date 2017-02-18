var chai = require('chai');
var chaiHttp = require('chai-http')
chai.use(chaiHttp);

//
// TESTS
//
describe('api/users', function(){
  it('it should get all the users', function(){
    chai.assert.isDefined(chai.request('http://localhost:2300').get('api/users'), 'no users are defined');
  });
});

//
// HELPER FUNCTIONS
//
var dummyTest = (function(){
  if(1 + 1 === 2){
    console.log("\'Test\' test passes");
  } else {
    throw new Error("We got trouble, right here in River City");
  }
})();