//Mongo Connection

const mongoose = require('mongoose');
var mongooseConnectionURL;

if (process.env.MONGODB_URI) {
  mongooseConnectionURL = process.env.MONGODB_URI;
} else {
  mongooseConnectionURL = 'mongodb://localhost/';
}

//Postgres Connection Using Sequelize

var Sequelize = require('sequelize');

if (process.env.DATABASE_URL) {

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true
  });

} else {

  var sequelize = new Sequelize('savvyshopper-test', '', '', {
    host: 'localhost',
    protocol: 'postgres',
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

}

var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200',
  log: "info"
});

client.ping({
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = {
  'sequelize': sequelize,
  'mongoose': mongoose.connect(mongooseConnectionURL),
  'elasticClient': client
};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGODB Database Connected.');
});