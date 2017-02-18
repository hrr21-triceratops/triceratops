var express = require('express');
var router = express.Router();
var sequelize = require('../db/connections.js').sequelize;
const Sequelize = require('sequelize');
const userModel = require('../db/schemas/userSchema.js');
<<<<<<< HEAD
const expertModel = require('../db/schemas/expertSchema.js');


=======
var _ = require('lodash');
var config = require('./../config.json');
var jwt = require('jsonwebtoken');
<<<<<<< HEAD
>>>>>>> Insert correct api routes into login component
=======
var bcrypt = require('bcrypt-nodejs');
>>>>>>> Add bcrypt hashing to user passwords on signup

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

<<<<<<< HEAD
<<<<<<< HEAD
//get all users
=======
=======
// CREATE JSON WEB TOKEN
>>>>>>> Create framework for category view
function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}
>>>>>>> Add login route to api for adding json tokens to session

// GET ALL USERS
router.get('/users', function(req, res) {
  userModel.findAll().then(function(users) {
    res.json(users);
  });
});

//Get a particular user

router.get('/users/:id', function(req, res) {
  userModel.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(users) {
    res.json(users);
  });
});

//get all users or get all experts (expert: true, non-expert: false)

router.get('/users/expert/:userType', function(req, res) {
  userModel.findAll({
    where: {
      shopperExpert: req.params.userType
    }
  }).then(function(users) {
    res.json(users);
  });
});

//get a single user of a particular type
//e.g. i want to check out if user 1 is still an active expert

router.get('/users/:id/:userType', function(req, res) {
  userModel.findAll({
    where: {
      id: req.params.id,
      shopperExpert: req.params.userType
    }
  }).then(function(users) {
    res.json(users);
  });
});

<<<<<<< HEAD
//find user by username

router.get('/users/username/:username', function(req, res) {
  userModel.findAll({
    where: {
      username: req.params.username
    }
  }).then(function(users) {
    res.json(users);
  });
});


//get top n active experts of a particular category
//ordered by average rating
//http://localhost:2300/api/users/topActiveExperts/food
//http://localhost:2300/api/users/topActiveExperts/sports


router.get('/users/topActiveExperts/:category/:count', function(req, res) {

var category = req.params.category || "sports";
var count = req.params.count || 50;

const expertQuery =
`SELECT "users".*, "experts"."`+category+`"
FROM "users"
INNER JOIN "experts" ON ("users"."id" = "experts"."userId")
WHERE ("users"."shopperExpert" = true
AND "users"."active"= true
AND "experts"."`+category+`" = true)
ORDER BY "users"."averageRating" DESC
LIMIT `+count+`;
`;

  sequelize.query(expertQuery).then(function(users) {
    console.log(users[0]);
    res.json(users[0]);
  });
});

<<<<<<< HEAD
//http://localhost:2300/api/users/topActiveExperts/food
//http://localhost:2300/api/users/topActiveExperts/sports

=======
=======
// LOGIN EXISTING USER
>>>>>>> Complete basic login functionality
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

<<<<<<< HEAD
>>>>>>> Insert correct api routes into login component
=======
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

<<<<<<< HEAD
>>>>>>> Allow users to signup for new accounts
module.exports = router;
=======
module.exports = router;
>>>>>>> Create framework for category view
