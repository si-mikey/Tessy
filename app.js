var express     = require('express');
var http        = require('http');
var path        = require('path');
var yaml        = require('yamljs');
var bodyParser  = require('body-parser');
var routes      = require('./lib/routes');
var TestCases   = require('./lib/routes/testcases.js');
var Tessy       = require('./lib/helper.js');
var app         = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.session({secret: process.env.SECRET_SESS_KEY}));
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('dev' == process.env.SITE_MODE) {
  app.use(express.errorHandler());
}

// verify user is logged in to view routes
function requireLoggedIn(req, res, next){
  var routeName = req.route.params[0];
  if(typeof req.session.user == 'undefined' && routeName != 'login'){
      res.redirect('/login'); 
    }else{
      next();
    }
}    

// set shared locals to all views if user is logged in
function setUser(req, res, next){
  if(typeof req.session.user == 'object'){
    var user = req.session.user;
    res.locals.user = user; 
  }  
    next();
}

// array of callbacks for routes
var initSession = [requireLoggedIn, setUser];

//route mappers
app.get('/',      initSession, routes.home);
app.get('/index', initSession, routes.home);
app.get('/home',  initSession, routes.home);


var callbacks = [Tessy.getAllCompanies, Tessy.getTeamsByCompanyName, Tessy.getComponentsByTeamName];
callbacks.push(TestCases.scenariosByCTCNames);
app.get('/testcases/:companyName?/:teamName?/:componentName?', initSession, callbacks, function(req, res, next){
  
  res.locals.company   = req.params.companyName;
  res.locals.team      = req.params.teamName;
  res.locals.component = req.params.componentName;
  res.render('testcases', {title: 'Tessy - Testcases'});
});

app.get('/reports', initSession, routes.reports);
app.get('/manage', initSession, routes.manage);
app.get('/login', routes.login);
app.post('/dologin', routes.dologin);
app.get('/account', initSession, routes.myaccount);
app.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/index'); 
  next();
});

// API ROUTES
app.get('/api/getAllCompanies',                     Tessy.getAllCompanies);
app.get('/api/getTeamsByCompanyName/:companyName',  Tessy.getTeamsByCompanyName);
app.get('/api/getComponentsByTeamName/:teamName',   Tessy.getComponentsByTeamName);

// Testcase routes
app.get('/api/scenariosByCTCNames/:companyName/:teamName/:componentName', TestCases.scenariosByCTCNames);

app.get('/api/steps/getById', TestCases.getStepsByIds); 
app.post('/api/steps/update', TestCases.updateStep); 










// start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Tessy started on port %d ', app.get('port'));
});
