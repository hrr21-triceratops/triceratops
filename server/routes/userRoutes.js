var express = require('express');
var router = express.Router();
var sequelize = require('../db/connections.js').sequelize;
const Sequelize = require('sequelize');
const userModel = require('../db/schemas/userSchema.js');
const expertModel = require('../db/schemas/expertSchema.js');

var _ = require('lodash');
var config = require('./../config.json');
var bcrypt = require('bcrypt-nodejs');

// GET ALL USERS
router.get('/users', function(req, res) {
  userModel.findAll().then(function(users) {
    res.json(users);
  });
});

// GET ALL EXPERTS
router.get('/users/experts', function(req, res) {
  userModel.findAll({
    where: {
      shopperExpert: true
    }
  }).then(function(users) {
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
  }).catch(function (err) {
    res.send(err);
  });
});

//Retrieve user preferences

router.get('/users/p/preferences/:id', function(req, res) {
  userModel.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(users) {
    res.json(users);
  });
});

//update user preferences

router.put('/users/preferences/update/:id', function(req, res) {
  var attributes = req.body;
  // console.log('attributes', attributes);
  userModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(user) {
    if (!user) {
      return res.status(401).send(null);
    } else {
        user.set('userPreferences.' + attributes.category, attributes.bool);
        user.save();
        // console.log('updated user preferences:', user);
        res.status(201).send(JSON.stringify('user preferences updated.'));
    }
  });
});

// res.status(201).send('attributes: ' + attributes);

//http://localhost:2300/api/users/topActiveExperts/food
//http://localhost:2300/api/users/topActiveExperts/sports

// LOGIN EXISTING USER
router.post('/users/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  userModel.findOne({ where: {username: username}}).then(function(user) {
    if (!user) {
      res.status(401).send(JSON.stringify(null));
    } else {
      bcrypt.compare(password, user.get('password'), function(err, match) {
        if (!match) {
          res.status(401).send(JSON.stringify(null));
        } else {
          res.status(201).send(user);
        }
      });
    }
  });
});

// SIGNUP NEW USER
router.post('/users', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var shopperExpert = req.body.shopperExpert;

  userModel.findOne({ where: {username: username}}).then(function(user) {
    if (user) {
      res.status(400).send(JSON.stringify(null));
    } else {
      bcrypt.hash(password, null, null, function(err, hash) {
        userModel.create({
          username: username,
          password: hash,
          shopperExpert: shopperExpert
        }).then(function(user) {
          res.status(201).send(user);
        });
      });
    }
  });
});

// UPDATE USER ACCOUNT
router.put('/users/:id', function(req, res) {
  // Object with property to update and new value
  var attributes = req.body.attributes;
  userModel.findOne({ where: {id: req.params.id}})
  .then(function(user) {
    if (!user) {
      res.status(401).send(JSON.stringify(null));
    } else {
      user.update(attributes)
      .then(function(user) {
        console.log('Updated User:', user);
        res.status(201).send(user);
      });
    }
  });
});

module.exports = router;