var dbc = require(process.cwd() + '/lib/models/db.js');


var testcases = {

  pageProps : { title: 'Tessy - Tests' },

  getCompanies : function(req, res, next){
     
    var query = "SELECT company_name FROM company"; 
    var resp = res;
    var companies = [];
    dbc.query(query)
      .on('result', function(res){
        res.on('row', function(row){
          
          companies.push(row.company_name);

        });  
      }).on('end', function(err){

      }); 
           
          this.renderView(req, res, companies); 
  },
  
  team : function(req, res){
 
    var company = dbc.escape(req.params.company);
 
    var query = "SELECT team_id, team_name " + 
                "FROM team, company, relate " + 
                "WHERE company_id = c_id AND company_name = " + company + 
                " AND team_id = t_id"; 
  
  },

  component : function(){

  },
  
    renderView : function(req, res, data){
    pageProps[data] = data; 
    res.render('testcases', pageProps);
  }


};


module.exports = testcases;
