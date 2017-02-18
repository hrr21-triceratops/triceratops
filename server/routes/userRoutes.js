var express = require('express');
var router = express.Router();
const userModel = require('../db/schemas/userSchema.js');
var _ = require('lodash');
var config = require('./../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

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
    return res.status(400).send(false);
  }

  userModel.findOne({ where: {username: username}}).then(function(user) {
    console.log('FOUND USER!', user);
    if (!user) {
      return res.status(401).send(false);
    }

    bcrypt.compare(password, user.get('password'), function(err, match) {
      console.log('COMPARING PASSWORDS!');
      if (!match) {
        return res.status(401).send(false);
      }

      res.status(201).send({
        id_token: createToken(user)
      });
    });
  });
});

// SIGNUP NEW USER
router.post('/users', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).send(false);
  }

  userModel.findOne({ where: {username: req.body.username}}).then(function(user) {
    if (user) {
      return res.status(400).send(false);
    }

    bcrypt.hash(password, null, null, function(err, hash) {
      userModel.create({
        username: username,
        password: hash,
        userRating: 0,
        userPreferences: {}
      }).then(function(user) {
        res.status(201).send({
          id_token: createToken(user)
        });
      });
    });
  });
});

module.exports = router;
