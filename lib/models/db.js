//var db = require('mariasql');
var yaml = require('yamljs');
var config = yaml.load(process.cwd() + '/config/config.yml');

 if(process.env.SITE_MODE == 'dev'){
  config.server = config.development;
  var debugStatus = true;
 }else{
  config.server = config.production;
  var debugStatus = false;
 }

//var dbc = new db();
//dbc.connect({
//  host: config.server.database.host,
//  user: config.server.database.user,
//  password: config.server.database.password,
//  db: config.server.database.db
//});

var knex = require('knex')({
  client: 'mariasql',
  connection: {
    host     : config.server.database.host,
    user     : config.server.database.user,
    password : config.server.database.password,
    db       : config.server.database.db,
    charset  : 'utf8',
    debug    : debugStatus
  }
});

  if(knex)
    console.log('DB Connected');

  knex.select().table('users').then(function(users){ console.log(users); })


//dbc.on('connect', function(){
//    console.log('DB Connected!');
//}).on('error', function(err){
//    console.log('DB  ' + err);
//}).on('close', function(cerr){
//    console.log('DB close? ' + cerr);
//});

//module.exports = dbc;
