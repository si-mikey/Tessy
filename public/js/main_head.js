var Tessy  = window.Tessy  || {}; 
var Helper = window.Helper || {}; 

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
     if($(row).hasClass(highlightClass)){

      $(row).removeClass(highlightClass)
    }else{

      $(row).addClass(highlightClass);
    }
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
  },

  saveSteps : function(steps){

   return $.ajax({
            type: "POST",
            url: "/api/steps/updateById",
            data: { steps: steps }
          });
  }
});


var Modal = Backbone.Model.extend({

  initialize: function(modal){
   this.modal = modal;
  },

  setTitle: function(newTitle){
    $(this.modal + " .modal-title").html(newTitle);
  },

  setStatus: function(type, msg){
    $(this.modal + " .modal-body-status").addClass('alert-'+type).html(msg);
  },
  
  clearStatus: function(){
    $(this.modal + " .modal-body-status").removeClass('alert-danger').removeClass('alert-success').html('');
  },

  setBody: function(content){
    $(this.modal + " .modal-body").html(content);
  },
  
  editStep: function(evt){
    var stepId         = evt.target.dataset.id;
    var stepText       = evt.target.innerHTML
    var row            = evt.target;
    var rowInput       = document.createElement("input");
    rowInput.name      = stepId;
    rowInput.value     = stepText;
    rowInput.className = 'steps-input form-control';
    row.innerHTML      = '';
    row.appendChild(rowInput); 
  },
  
  addStep: function(){

  },
  
  setFooter: function(data){
   $(this.modal + " .modal-footer"); 
  },

  toggle: function(toggle, delay){
  
     var delay = delay || 0;
     if(toggle === 'hide'){ 
      var that = this;
      window.setTimeout(function(){ 
        $(that.modal).modal(toggle)
        that.setTitle('');  
        that.setBody('');
        that.clearStatus();
      }, delay);

     }else{
        $(this.modal).modal(toggle); 
  }  } 
  
});

