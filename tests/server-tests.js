var chai = require('chai');
var expect = require('chai').expect;
var request = require('request');

//
// TESTS
//
describe('routes', () => {
  it('should have a users route', (done) => {
    request.get('http://localhost:2300/users', function(err, res, body){
      if(err){
        console.log("ERROR", err);
      }
      expect(res.body).to.exist;
      done();
    });
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