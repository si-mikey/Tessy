var db = require('mariasql');
var yaml = require('yamljs');
var config = yaml.load(process.cwd() + '/config/config.yml');

 process.env.SITE_MODE == 'dev' ?  config.server = config.development : config.server = config.production;

var dbc = new db();
dbc.connect({
  host: config.server.database.host,
  user: config.server.database.user,
  password: config.server.database.password,
  db: config.server.database.db
});

dbc.on('connect', function(){
    console.log('DB Connected!');
}).on('error', function(err){
    console.log('DB  ' + err);
}).on('close', function(cerr){
    console.log('DB close? ' + cerr);
});

module.exports = dbc;
