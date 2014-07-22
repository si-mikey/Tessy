module.exports = function(req, res){
    var loginError = req.query.loginError;
    if(loginError){
      res.locals.loginError = loginError       
    } 
    res.render('login', { title: 'Tessy Login'});
}
