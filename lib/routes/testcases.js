var knex = require(process.cwd() + '/lib/models/db.js');
var _ = require('underscore');

var testcases = {

  getScenariosByCTC : function(req, res, next){

    var company_id   = req.params.companyId;
    var team_id      = req.params.teamId;
    var component_id = req.params.componentId;
    var subq = knex('relate')
               .where('ci_id', company_id)
               .andWhere('t_id', team_id )
               .andWhere('co_id', component_id)
    knex.select('tc_id', 'tc_scenario', 'tc_steps')
        .from('testcases')
        .where('tc_relate_id', 'in', subq)
        .then(function(scenarios){
          console.log(scenarios); 
        });


  },


  getSteps  : function(req, res, next){
    
    var resp = res; 
    var nextp = next;
    //TODO: sanitize these inputs
    var stepIds = req.query.stepIds;
    var query = "SELECT * FROM testcases_steps WHERE st_id IN (" + stepIds + ")";
    var steps = [];
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){
      
          steps.push(row)

         })
       }).on('end', function(err){

          res.send(steps);
          nextp();

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


module.exports = testcases;
