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

  loadSteps : function(stepIds){

      $.ajax({
         type: "GET",
         url: "/api/steps/getById",
         data: { stepsId : stepIds }
      }).done(function( steps ) {
        
         $(".scenario-modal .modal-title").html(scenarioName);

         steps.forEach(function(step){
            
         $("#scenarioSteps .modal-body").append("<div class='step-row' data-id="+ step.st_id + ">" +  step.st_text  + "</div>")    
             
         });          

      });  

  }


  


}
