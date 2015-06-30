var knex = require(process.cwd() + '/lib/models/db.js');
var _ = require('lodash-node');

var TestCases = {

  scenariosByCTCNames : function(req, res, next){

   var companyName   = req.params.companyName;
   var teamName      = req.params.teamName;
   var componentName = req.params.componentName;
   if(companyName && teamName && componentName){
     knex.raw('SELECT tc_id, tc_scenario, tc_steps ' +
                'FROM testcases ' +
                'WHERE tc_relate_id = ' +
                '(SELECT r_id ' +
                 'FROM relate ' +
                 'WHERE c_id = (SELECT company_id FROM company WHERE company_name = ?) ' +
                 'AND t_id   = (SELECT team_id FROM team WHERE team_name = ?) ' +
                 'AND co_id  = (SELECT co_id FROM component WHERE co_name = ?)) ', 
              [companyName, teamName, componentName])
              .then(function(scenarios){
                if(req.route.path.match('/testcases')){
                  res.locals.scenarios = _.first(scenarios);
                  next();
                 }else{  
                  res.send(200, _.first(scenarios)); 
                  next();
                 }
              });
   }else{
    next();
   }
  },

  scenariosByCTCIds : function(req, res, next){

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

  getStepsById : function(req, res, next){
    
    var stepIds = req.query.stepIds.split(',').map(Number);
    if(!isNaN(stepIds[0])){ 
       knex.select()
        .from('testcases_steps')
        .where('st_id', 'in', stepIds)
        .then(function(steps){
          res.send(200, steps);
          next();
        });
    }else{
      res.send(404);
      next();
    }
  },


  updateStep : function(req, res, next){
    var step = req.body.step;
    console.log(req.body);
    knex("testcases_steps")
      .where("st_id", "=", step.name)
      .update("st_text", step.value)
      .then(function(result){
      });
  }
};


module.exports = TestCases;
