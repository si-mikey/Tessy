var knex    = require(process.cwd() + '/lib/models/db.js');
var bcrypt = require('bcryptjs');

module.exports = function(req, res, next){

    var email = req.body.email;
    var pass  = req.body.password;
    var user = {};
    knex.select().from('users').where('email_main', email)
     .then(function(usr){
      if(usr.length){
        bcrypt.compare(pass, usr[0].password_hash, function(err, result){
          if(result){
            user['loggedIn'] = true;
            user['email'] = email;
            user['userName'] = usr[0].user_name;
            req.session.user = user;
            res.redirect('/index');
          }else{ res.redirect('/login?loginError=true'); }
        })
      }else{ res.redirect('/login?loginError=true'); }
     }) 
};

