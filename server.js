var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//change name after we change the placeholder.js
var db = require('./db/placeholder.js');

app.use(require('./routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.listen(3000);
console.log('server running on port 3000');

/*-----end of line---- */