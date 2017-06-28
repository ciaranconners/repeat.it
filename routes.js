var express = require('express');
var router = express.Router();
var UserFile = require('./db/models/user');
var Card = require('./db/models/card');
var Deck = require('./db/models/deck');

var bodyParser = require('body-parser');

//retrieve all decks
router.get('/decks', function(req, res) {
  Deck.find({}).then(function(decks) {res.json(decks);});
});

router.post('/decks', function(req, res) {
  Deck.create(req.body).then(function(deck) {
    res.json(deck);
  });
});

router.put('/decks/:id', function(req, res) {
  Deck.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}).then(function(deck) {
    res.json(deck);
  });
});

router.delete('/decks/:id', function(req, res) {
  Deck.findByIdAndRemove({_id: req.params.id}).then(function(deletedDeck) {
    res.json(deletedDeck);
  });
});

///////////////////////////
//////////////////////////

router.get('/users', function(req, res) {
  UserFile.User.find({}).then(function(users) {res.json(users);});
});

router.post('/users', function(req, res) {
  UserFile.User.create(req.body).then(function(user) {
    res.json(user);
  });
});

router.put('/users/:id', function(req, res) {
  UserFile.User.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}).then(function(user) {
    res.json(user);
  });
});

router.delete('/users/:id', function(req, res) {
  UserFile.User.findByIdAndRemove({_id: req.params.id}).then(function(deletedUser) {
    res.json(deletedUser);
  });
});

/////////
////////

router.post('/login', function(req, res) {
  UserFile.User.findOne({username: req.body.username}).then(function(user) {
    if (user !== null) {
      if (user.password === req.body.password) {
        console.log('user authenticated');
        res.status(200).send('welcome!');
      } else {
        console.log('invalid user/password combo');
        res.status(200).send('try again');
      }
    } else {
      console.log('invalid username');
      res.send('invalid username');
    }
  });
});

router.post('/signup', function(req, res) {
  UserFile.User.findOne({username: req.body.username}).then(function(user) {
    if (user === null) {
      UserFile.User.create({
        username: req.body.username,
        password: req.body.password
      }).then(function(user) {
        res.status(200).send('welcome!');
      });
    } else {
      res.send('username already taken');
    }
  });
});

module.exports = router;
