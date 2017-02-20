## Testing workflow ##

Travis CI is setup to run tests automatically on each pull request to the main repo and build.

tests live in the tests folder:
  server-tests.js
  api-tests.js
  database-tests.js

tests are written in using Mocha as a taskrunner and Chai as an assertion library

A block of functionality should be tested by writing one describe block per piece of functionality. Use nested it statements to test each aspect of the piece you are testing.

//EXAMPLE TEST TO GET USERS:
  describe('FUNCTIONALITY_TO_TEST', function(){
    it('DESCRIBE_WHAT_FUNCTIONALITY_SHOULD_BE_DOING', function(){
      //had some difficulty loading up the server so hardcoded localhost for now
      chai.assert.isDefined(chai.request('http://localhost:2300').get('api/users'), 'no users are defined');
    });
  });

You can also write out helpful functions to return data to test at the top or bottom of the test file

### to run code against all tests locally: ###

check that all servers/databases the app needs are running

run 'npm test' from the main directory in terminal


OTHER NOTES:
Need to export the path to './App.js' from index file for tests to be able to pass