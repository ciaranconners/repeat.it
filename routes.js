var express = require('express');
var router = express.Router();
var User = require('./db/models/user');
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

router.post('/login', function(req, res) {
  // req contains username and password
    // check if username in DB or no
    //if yes
      // validate password
      // response => indicates result of that validation
    // if no,
      // response => invalid username
});

router.post('/signup', function(req, res) {
  // req contains username and password
    // check if username in DB or no
    //if yes
      // response => username taken
    // if no, create new user
      // response => new user created
});

module.exports = router;
