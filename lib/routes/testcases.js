var dbc = require(process.cwd() + '/lib/models/db.js');


var testcases = (function(req, res){

  var _pageProps = { title: 'Tessy - Tests' };

  var company = function(req, res){
    //TODO: sanitize params for sql
    var company = dbc.escape(req.params.company);
    var query = 'SELECT team_id, team_name FROM team, company, relate WHERE company_id = c_id AND company_name = '+ company +' AND team_id = t_id'; 

    console.log(query);

  };
  
  var team = function(){


  };

  var component = function(){


  };
  
  var renderView = function(req, res){

    res.render('testcases', _pageProps);
  };


  return {
    company     : company,
    team        : team,
    component   : component,
    renderView  : renderView 
  };

})();

module.exports = testcases;
