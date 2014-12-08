var knex = require(process.cwd() + '/lib/models/db.js');
var _ = require('underscore');

var testcases = {

  getCompanies : function(req, res, next){
    
    knex.select('company_id', 'company_name')
        .from('company')
        .then(function(comps){ 
          req.session.companies = comps; 
          next();
        })
  },

  
  getTeams: function(req, res, next){

    var company = req.params.company;
    var reqp  = req;
    var nextp = next;
    knex.distinct('team_id', 'team_name').select().from('team')
    .join('relate', 'team.team_id', '=', 'relate.t_id')
    .join('company', 'company.company_id', '=', 'relate.c_id')
    .where({company_name: company})
    .then(function(tms){
      reqp.session.teams = tms;
      nextp();
    });
  },
    

  getComponents : function(req, res, next){
     
    if(typeof components == 'object'){ next(); }
    var nextp = next; 
    var company = req.params.company;
    var company_id = _.invert(req.session.companies)[company];
    var team = req.params.team;
    var team_id = _.invert(req.session.teams)[team];
    var components = {}; 
    var reqp = req;
    var query = "SELECT component.co_id, component.co_name " + 
                "FROM component, company, team, relate " + 
                "WHERE company_id = c_id " + 
                " AND company_id = '" + company_id + 
                "' AND team_id = t_id" +
                " AND team_id = '" + team_id +
                "' AND component.co_id = relate.co_id"; 
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){

           components[row.co_id] = row.co_name;

          });
        }).on('end', function(err){
          
           reqp.session.components = components;
           nextp(); 

        });


  },


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
