module.exports = function(req, res){
  if(typeof req.session.user != "undefined"){
    var userName = req.session.user.userName;
    res.locals.userName = userName;
  }
  res.render('home', { title: 'Tessy - Home' });
}; 
