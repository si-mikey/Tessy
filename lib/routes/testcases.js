var dbc = require(process.cwd() + '/lib/models/db.js');


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

    var fnext = next; 
    var company = dbc.escape(req.params.company);
    var team = []; 
    var resp = res;
    var query = "SELECT team_id, team_name " + 
                "FROM team, company, relate " + 
                "WHERE company_id = c_id AND company_name = '" + company + 
                "' AND team_id = t_id"; 
    dbc.query(query)
       .on('result', function(res){
         res.on('row', function(row){

           team.push(row.team_name);

          });
        }).on('end', function(err){

             
           //resp.render('testcases', {title: 'Tessy - Testcases'}); 

        });
       
  },
    


  getComponents : function(){

  }
  

};


module.exports = testcases;
