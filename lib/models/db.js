var yaml = require('yamljs');
var config = yaml.load(process.cwd() + '/config/config.yml');

 if(process.env.SITE_MODE == 'dev'){
  config.server = config.development;
  var debug = true;
 }else{
  config.server = config.production;
  var debug = false;
 }

  var knex = require('knex')({
    client: 'mariasql',
    connection: {
      host     : config.server.database.host,
      user     : config.server.database.user,
      password : config.server.database.password,
      db       : config.server.database.db,
      charset  : 'utf8',
      debug    : debug
    }
  })


module.exports = knex;

