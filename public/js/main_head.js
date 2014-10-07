var Tessy = window.Tessy || {}; 

var Helper =  {

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


var TestCases = Backbone.Model.extend({

  getSteps : function(stepIds){
      
   return $.ajax({
           type: "GET",
           url: "/api/steps/getById",
           data: { stepIds : stepIds }
        });  
  }

});


var Modal = Backbone.Model.extend({
  
  initialize: function(modal){
    
    this.modal = modal;
  },

  setTitle: function(newTitle){
    
    $(this.modal + ' .modal-title').html(newTitle);
  },

  setBody: function(data){
  
    $(this.modal + ' .modal-body' ).html(data);  
  },

  setFooter: fuction(data){

    $(this.modal + ' .modal-footer').html(data);
  }
});
