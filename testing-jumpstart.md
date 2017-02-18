## Testing workflow ##

Travis CI is setup to run tests automatically on each pull request to the main repo and build.

tests live in the tests folder:
test-loader.js (loads and runs the following tests)
  server-tests.js
  api-tests.js
  database-tests.js

### to run code against all tests locally: ###

check that all servers/databases the app needs are running

run 'npm test' from the main directory in terminal