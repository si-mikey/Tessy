var dbc    = require(process.cwd() + '/lib/models/db.js');
var bcrypt = require('bcryptjs');


module.exports = function(req, res){

    var email = req.body.email;
    var resp = res;
    dbc.query('SELECT password_hash FROM users WHERE email_main = ?', [email])
       .on('result', function(res){
        res.on('row', function(row){
          bcrypt.compare(req.body.password, row.password_hash, function(err, res){
           
            if(res == true){
              req.session.loggedIn = true;
              resp.redirect('/home');
            }else{
              resp.redirect('/login?loginError=true');
            }

          });
        })

       }).on('error', function(err){
          console.log('Error in SQL');
        })   


}; 
