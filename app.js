var express   = require('express');
var http      = require('http');
var path      = require('path');
var yaml      = require('yamljs');
var bodyParser = require('body-parser');
var routes    = require('./lib/routes');
var testcases = require('./lib/routes/testcases.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.cookieParser());
app.use(express.session({secret: process.env.SECRET_SESS_KEY}));
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
var defaultCallbacks = [requireLoggedIn, setLocals];

//route mappers
app.get('/', defaultCallbacks, routes.home);
app.get('/index', defaultCallbacks, routes.home);
app.get('/home', defaultCallbacks, routes.home);

var testcase_data = [testcases.getCompanies, testcases.getTeams, testcases.getComponents];

app.get('/testcases', defaultCallbacks, testcase_data[0], function(req, res){

    res.locals.companies = req.session.companies;
    res.render('testcases', {title: 'Tessy - Testcases'});

});

app.get('/testcases/:company', defaultCallbacks, testcase_data[0], testcase_data[1], function(req, res){
    
    res.locals.company    = req.params.company;
    res.locals.companies  = req.session.companies;
    res.locals.teams      = req.session.teams;
    res.render('testcases', {title: 'Tessy - Testcases'});
});

app.get('/testcases/:company/:team', defaultCallbacks, testcase_data, function(req, res){
    
    res.locals.company    = req.params.company;
    res.locals.team       = req.params.team;
    res.locals.companies  = req.session.companies;
    res.locals.teams      = req.session.teams;
    res.locals.components = req.session.components; 
    res.render('testcases', {title: 'Tessy - Testcases'});    
});

app.get('/testcases/:company/:team/:component', defaultCallbacks, testcase_data, testcases.getScenarios, function(req, res){
 
    res.locals.company    = req.params.company;
    res.locals.team       = req.params.team;
    res.locals.companies  = req.session.companies;
    res.locals.teams      = req.session.teams;
    res.locals.components = req.session.components; 
    res.render('testcases', {title: 'Tessy - Testcases'});

});

app.get('/reports', defaultCallbacks, routes.reports);
app.get('/manage', defaultCallbacks, routes.manage);
app.get('/login', routes.login);
app.post('/dologin', routes.dologin);
app.get('/account', defaultCallbacks, routes.myaccount);
app.get('/logout', function(req, res, next){
    
     req.session.destroy();
     res.redirect('/index'); 
     next();
});


//API ROUTES
app.get('/test', function(req, res, next){
  console.log('testing');
  next();
});

app.get('/api/steps/getById', testcases.getSteps); 

    


//start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Tessy started on port %d ', app.get('port'));
});
