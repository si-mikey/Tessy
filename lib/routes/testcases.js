var dbc = require(process.cwd() + '/lib/models/db.js');


var testcases = (function(req, res){


  var company = function(){
    

  };
  
  var team = function(){


  };

  var component = function(){


  };
  
  
  var defaultView = function(req, res){

    res.render('testcases', { title: 'Tessy - Tests' });

  };


  return {
    company     : company,
    team        : team,
    component   : component,
    defaultView : defaultView
  };


})()

module.exports = testcases;
