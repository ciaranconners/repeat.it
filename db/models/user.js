const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config');

// create user schema and module
const UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

//mongoose.model(modelName, schema)
module.exports = UserSchema;
