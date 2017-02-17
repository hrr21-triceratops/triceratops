var express = require('express');
var router = express.Router();
const userModel = require('../db/schemas/userSchema.js');
var _ = require('lodash');
var config = require('./../config.json');
var jwt = require('jsonwebtoken');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

router.get('/users', function(req, res) {
  userModel.findAll().then(function(users) {
     res.json(users);
  });
});

// LOGIN EXISTING USER
router.post('/users/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("Missing username or password.");
  }

  userModel.findOne({ where: {username: req.body.username}}).then(function(user) {
    if (!user) {
      return res.status(401).send("User does not exist.");
    }

    if (user.password !== password) {
      return res.status(401).send("Incorrect password.");
    }

    res.status(201).send({
      id_token: createToken(user)
    });
  });
});

// SIGNUP NEW USER
router.post('/users', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("Missing username or password.");
  }

  userModel.findOne({ where: {username: req.body.username}}).then(function(user) {
    if (user) {
      return res.status(400).send("User already exists.");
    }

    userModel.create({
      username: username,
      password: password,
      userRating: 0,
      userPreferences: {}
    }).then(function(user) {
      res.status(201).send({
        id_token: createToken(user)
      });
    });
  });
});

module.exports = router;
