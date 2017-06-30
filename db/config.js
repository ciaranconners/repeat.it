var mongoose = require('mongoose');

mongooseURI = 'mongodb://localhost/flashcardsdb2';
mongoose.connect(mongooseURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection err'));

db.once('open', function() {
  console.log('Mongodb connection is open');
});
