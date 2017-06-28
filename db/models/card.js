var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../config');

var CardSchema = new Schema({
  front: String,
  back: String,
  progress: Number,
  age: Number,
  effort: Number,
  plaintext: {
    type: Boolean,
    default: true
  },
  lang: {
    type: String,
    default: 'Javascript'
  }
});

var Card = mongoose.model('Card', CardSchema);

module.exports = {
  Card: Card,
  CardSchema: CardSchema
};
