var knex = require(process.cwd() + '/lib/models/db.js');
var _ = require('underscore');

var testcases = {

  getScenarios : function(req, res, next){

    var nextp = next; 
    var resp = res;
    var company = req.params.company;
    var company_id = _.invert(req.session.companies)[company];
    var team = req.params.team;
    var team_id = _.invert(req.session.teams)[team];
    var component = req.params.component;
    var component_id = _.invert(req.session.components)[component]; 
    var scenarios = [];
    var query = "SELECT tc_id, tc_scenario, tc_steps FROM testcases " + 
                " WHERE tc_relate_id = (SELECT r_id " + 
                                        "FROM relate " +  
                                        "WHERE c_id = '" + company_id + 
                                        "' AND t_id   = '" + team_id + 
                                        "' AND co_id  = '" + component_id + "')"; 
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){
          
           scenarios.push(row);

          });
        }).on('end', function(err){

           resp.locals.scenarios = scenarios;
           nextp(); 

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
