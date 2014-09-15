var dbc = require(process.cwd() + '/lib/models/db.js');
var _ = require('underscore');

var testcases = {

  getCompanies : function(req, res, next){
    
    var fnext = next; 
    var query = "SELECT company_id, company_name FROM company"; 
    var reqp = req; 
    var nextp = next;
    var companies = {};
    dbc.query(query)
       .on('result', function(res){
        res.on('row', function(row){
           
          companies[row.company_id] = row.company_name; 

        });  
      }).on('end', function(err){
        
         reqp.session.companies = companies; 
         nextp();
           
      }); 
    
  },

  
  getTeams: function(req, res, next){

    var nextp = next; 
    var company = dbc.escape(req.params.company);
    var teams = {}; 
    var reqp = req;
    var query = "SELECT team_id, team_name " + 
                "FROM team, company, relate " + 
                "WHERE company_id = c_id AND company_name = '" + company + 
                "' AND team_id = t_id"; 
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){

           teams[row.team_id] = row.team_name;

          });
        }).on('end', function(err){
           
           reqp.session.teams = teams;
           nextp(); 

        });
       
  },
    

  getComponents : function(req, res, next){

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
    var scenarios = {};
    var query = "SELECT tc_id, tc_scenario FROM testcases " + 
                " WHERE tc_relate_id = (SELECT r_id " + 
                                        "FROM relate " +  
                                        "WHERE c_id = '" + company_id + 
                                        "' AND t_id   = '" + team_id + 
                                        "' AND co_id  = '" + component_id + "')"; 
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){
           
           scenarios['id'] = row.tc_id;
           scenarios['name'] = row.tc_scenario;
          
          });
        }).on('end', function(err){

           resp.locals.scenarios = scenarios;
           nextp(); 

        });


  }
  
  

};


module.exports = testcases;
