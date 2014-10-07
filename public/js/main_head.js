var tessy = window.tessy || {}; 

tessy.helper = {

  getUrlParam : function(name){

     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
     results = regex.exec(location.search);
     return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 

   },

  setDropDownText : function(){

    var params = window.location.pathname.split("/").slice(2,5);
    if( params.length > 0){
      var dropDowns = document.querySelectorAll(".span10 button");
      params.map(function(param, index){ 
        dropDowns[index].innerHTML = param + '<span class="caret"></span>';
      });
    } 

  },

  highlightTblRow  : function(tblSelector, highlightClass){

   $(tblSelector).on("click", function(evt){
     var row = evt.target.parentNode;
     (row.className == highlightClass) ? row.className = '' : row.className = highlightClass;
   });

  } 

};

tessy.testCases = {

  getSteps : function(stepIds){
      
   return $.ajax({
           type: "GET",
           url: "/api/steps/getById",
           data: { stepIds : stepIds }
        });  
  },

  getScenarios  : function(scenarioIds){


  }

}

tessy.modals = {

  setModalTitle : function(selector, newTitle){
    
    $(selector).html(newTitle);
  },

  appendTo  : function(selector, data){
  
    $(selector).append(data);  
  }

}
