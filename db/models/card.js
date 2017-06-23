const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config');

const CardSchema = new Schema({
  front: {
    type: String
  },
  back: {
    type: String
  },
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

module.exports = CardSchema;
