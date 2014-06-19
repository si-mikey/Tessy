var express = require('express');
var http    = require('http');
var path    = require('path');
var db      = require('mariasql');

var routes    = require('./lib/routes');


var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.session({secret: '123456789'}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//route mappers
app.get('/', routes.home);
app.get('/index', routes.home);
app.get('/home', routes.home);
app.get('/testcases', routes.testcases);
app.get('/reports', routes.reports);
app.get('/manage', routes.manage);
app.get('/login', routes.login);
app.post('/dologin', routes.dologin);

//db connection
//var dbobj = new db();
//dbobj.connect({
//  host: '127.0.0.1',
//  user: 'root',
//  password: 'testing',
//  db: 'tessy'
//});
//
//dbobj.on('connect', function(){
//
//   console.log('db connected');
//
//});

//start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Tessy started on port %d ', app.get('port'));
});
