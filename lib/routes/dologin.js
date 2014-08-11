var dbc    = require(process.cwd() + '/lib/models/db.js');
var bcrypt = require('bcryptjs');

module.exports = function(req, res){
    
    var email = req.body.email;
    var resp = res;
    var userFound = false;
    var user = {};
    dbc.query('SELECT * FROM users WHERE email_main = ? Limit 1', [email])
       .on('result', function(res){
          res.on('row', function(row){
            userFound = true;
            bcrypt.compare(req.body.password, row.password_hash, function(err, res){
              
              if(res){
                user['loggedIn'] = true;
                user['email'] = email;
                user['userName'] = row.user_name;
                req.session.user = user;
                resp.redirect('/index');
              }else{
                resp.redirect('/login?loginError=true');
              }

            });
          })
       }).on('error', function(err){
          console.log('Error in SQL');
       }).on('end', function(err){
          if (!userFound) resp.redirect('/login?loginError=true');
        });

}; 
