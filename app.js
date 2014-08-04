var express = require('express');
var http    = require('http');
var path    = require('path');
var yaml    = require('yamljs');

var routes    = require('./lib/routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.cookieParser());
app.use(express.session({secret: process.env.SECRET_SESS_KEY}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('dev' == process.env.SITE_MODE) {
  app.use(express.errorHandler());
}

//verify user is logged in to view routes
function requireLoggedIn(req, res, next){
  var routeName = req.route.params[0];
  if(typeof req.session.user == 'undefined' && routeName != 'login'){
      res.redirect('/login'); 
    }else{
      next();
    }
}    

//set shared locals to all views if user is logged in
function setLocals(req, res, next){
  if(typeof req.session.user == 'object'){
    var user = req.session.user;
    res.locals.user = user; 
  }  
    next();
}

//array of callbacks for routes
var cbs = [requireLoggedIn, setLocals];

//route mappers
//app.get('/*', requireLoggedIn);
app.get('/', cbs, routes.home);
app.get('/index', cbs, routes.home);
app.get('/home', cbs, routes.home);
app.get('/testcases', cbs, routes.testcases);
app.get('/reports', cbs, routes.reports);
app.get('/manage', cbs, routes.manage);
app.get('/login', routes.login);
app.post('/dologin', routes.dologin);
app.get('/account', cbs, routes.myaccount);

//start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Tessy started on port %d ', app.get('port'));
});
