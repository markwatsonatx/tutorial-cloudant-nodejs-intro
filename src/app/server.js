var cloudant = require('cloudant');
var config = require("./config.js");
var express = require('express');

var app = express();

var cloudantConn;

// connect to cloudant
cloudant(config.cloudantUrl, function(err, cloudant) {
    cloudantConn = cloudant;
    if (err) {
        console.log('Could not connect to cloudant.');
        console.log(err.message);
    }
    else {
        console.log('Connection successful.');
    }
});

// set view engine and map views directory
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// map requests
app.get('/', function(req, res) {
    res.render('index', {cloudantConnected: (cloudantConn != null)});
});

// start server
app.listen(config.express.port, '0.0.0.0', function() {
  console.log('Server started on port ' + config.express.port + '.')
});