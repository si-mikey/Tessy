var knex = require(process.cwd() + '/lib/models/db.js');
var _ = require('underscore');

var TestCases = {

  getScenariosByCompanyIdTeamIdComponentId : function(req, res, next){

   var company_id   = req.params.companyId;
   var team_id      = req.params.teamId;
   var component_id = req.params.componentId;
   if(company_id && team_id && component_id){   
      var subq = knex('relate')
                 .where({c_id:  company_id,
                         t_id:  team_id,
                         co_id: component_id}).select('r_id');
      knex.select('tc_id', 'tc_scenario', 'tc_steps')
          .from('testcases')
          .where('tc_relate_id', 'in', subq)
          .then(function(scenarios){
            res.send(200, scenarios); 
            next();
          });
   }else{
     next();
   }
  },


  getStepsById  : function(req, res, next){
    
    var stepIds = req.query.stepIds;
    knex.select()
      .from('testcases_steps')
      .where('st_id', 'in', stepIds)
      .then(function(steps){
        res.send(200, steps);
        next();
      });
  },


  updateById  : function(req, res, next){
    
    var resp = res;
    var query = 'INSERT INTO testcases_steps (st_text, st_id) VALUES ';
    req.body.steps.forEach(function(step){
      
      query  += "('" + step.value + "'," + step.name + "),";  
    });
    query = query.substring(0, query.length - 1); 
    query += ' ON DUPLICATE KEY UPDATE st_text = VALUES(st_text)' ;
    dbc.query(query)
       .on('result', function(res){ 
        res.on('row', function(row){
           
        })
      }).on('end', function(err){
        
         if(err){ nextp(err); }
         resp.send(200, 'ok');  
      }); 

  }


  
};


module.exports = TestCases;
