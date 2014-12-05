var knex = require(process.cwd() + '/lib/models/db.js');
var Tessy = {};

Tessy  = { 

  getAllCompanies : function(req, res, next){
    
   knex.select('company_id', 'company_name')
     .from('company')
     .then(function(companies){ 
      if(req.route.path.match('/testcases')){ 
       res.locals.companies = companies; 
       next();
      }else{
       res.send(200, companies); 
       next();
      }
     })
  },

  
  getTeamsByCompanyId: function(req, res, next){

    var companyId = req.params.companyId; 
    knex.distinct('team_id', 'team_name').select().from('team')
     .join('relate', 'team.team_id', '=', 'relate.t_id')
     .where('team.team_name', companyId)
     .then(function(teams){
       res.send(teams);
       next();
     });
  },
    

  getComponentsByTeamId : function(req, res, next){

   var teamId = req.params.teamId;
   knex.select('component.co_id', 'component.co_name')
     .from('component')
     .join('relate', 'relate.co_id', '=', 'component.co_id')
     .where('relate.t_id', teamId)
     .then(function(components){
       res.send(components);
       next();
     });
  }

}

module.exports = Tessy;
