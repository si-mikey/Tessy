var knex = require(process.cwd() + '/lib/models/db.js');
var Tessy = {};

Tessy  = { 

  getCompanies : function(req, res, next){
    
   knex.select('company_id', 'company_name')
     .from('company')
     .then(function(companies){ 
       res.send(companies); 
       next();
     })
  },

  
  getTeams: function(companyId){

   var companyId = companyId;
   knex.distinct('team_id', 'team_name').select().from('team')
     .join('relate', 'team.team_id', '=', 'relate.t_id')
     .where('company.c_id', companyId)
     .then(function(teams){
       return teams; 
     });
  },
    

  getComponents : function(teamId){

   knex.select('component.co_id', 'component.co_name')
     .from('component')
     .join('relate', 'relate.co_id', '=', 'component.co_id')
     .where('relate.t_id', team_id )
     .then(function(comps){
       return comps;
     });
  }

}

module.exports = Tessy;
