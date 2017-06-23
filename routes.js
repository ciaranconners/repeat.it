var express = require('express');
var router = express.Router();
var User = require('./db/models/user');
var Card = require('./db/models/card');
var Deck = require('./db/models/deck');

//retrieve all deck
router.get('/cards', function(req, res) {
  res.send("hello world");
})


//save a new deck
router.post('/cards', function(req, res) {
  res.send("hello world");
})


//edit deck
router.put('/cards/:id', function(req, res) {
  res.send("hello world");
})

//delete a card from the deck
router.delete('/cards/:id', function(req, res) {
  res.send("hello world");
})

module.exports = router;
