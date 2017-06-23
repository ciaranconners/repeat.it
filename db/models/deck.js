const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardSchema = require('./card');
const UserSchema = require('./user');
const db = require('../config');

const DeckSchema = new Schema({
  deckname: {
    type: String
  },
  owner: UserSchema,
  public: {
    type: Boolean,
    default: false
  },
  date: Date,
  cards: [CardSchema]
});

module.exports = DeckSchema;
