var dbc = require(process.cwd() + '/lib/models/db.js');

console.log(dbc);

module.exports = function(req, res){
  res.render('home', { title: 'Tessy - Logged in - ' });

}; 
