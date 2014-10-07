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

  initialize: function(title, content){
   this.setTitle(title);
   this.setBody(content);
  },

  setTitle: function(newTitle){
    $(".scenario-modal .modal-title").html(newTitle);
  },

  setBody: function(content){
    $(".scenario-modal .modal-body").html(content);
  },
  
  editStep: function(e){
  
  },
  
  addStep: function(){

  },
  
  setFooter: function(data){
   $(".scenario-modal .modal-footer"); 
  },

  toggle: function(toggle){
   $(".scenario-modal").modal(toggle);
  } 
  
});

