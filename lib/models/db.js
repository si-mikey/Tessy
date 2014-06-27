var db = require('mariasql');

var dbc = new db();
dbc.connect({
  host: '127.0.0.1',
  user: 'root',
  password: 'testing',
  db: 'tessy'
});

dbc.on('connect', function(){
    console.log('DB Connected!');
}).on('error', function(err){
    console.log('DB Connection error: ' + err);
}).on('close', function(cerr){
    console.log('DB Connection closed with ' + cerr);
});

module.exports.dbc = dbc;
