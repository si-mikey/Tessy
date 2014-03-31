var express = require('express');
var app = express();


app.get('/', function(req, res){

  res.send('hello world');

});


app.get('/index', function(req, res){

  res.send('hello world');

});


var server = app.listen(8000, function(){

 console.log('Tessy Started on port %d', server.address().port);

});



