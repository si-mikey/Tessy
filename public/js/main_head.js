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
  updateStep : function(step){
   return $.ajax({
            type: "POST",
            url: "/api/steps/update",
            data: { step : step }
          });
  }
});

var Modal = Backbone.Model.extend({
  initialize: function(modal){
   this.modal = modal;
  },
  editTitle: function(evt){
   var elem            = evt.target;
   var scenarioTitle   = elem.innerHTML;
   var editInput       = document.createElement("input");
   editInput.value     = scenarioTitle;
   editInput.className = 'form-control' 
   $(this.modal + " .modal-title").html(editInput);
  },
  setTitle: function(newTitle, scenarioId){
    $(this.modal + " .modal-title").html(newTitle);
    $(this.modal + " .modal-title").attr("data-id", scenarioId);
  },
  setStatus: function(type, msg){
    $(this.modal + " .modal-body-status").addClass('alert-'+type).html(msg);
  },
  clearStatus: function(duration){
    var that     = this;
    var duration = duration || 0;
    window.setTimeout(function(){
      $(that.modal + " .modal-body-status")
        .removeClass('alert-danger').removeClass('alert-success').html('');
    }, duration);
  },
  setBody: function(content){
    $(this.modal + " .modal-body").html(content);
  },
  editStep: function(evt){
    var stepId           = evt.target.dataset.id;
    var stepText         = evt.target.innerHTML
    var row              = evt.target;
    var rowInput         = document.createElement("input");
    var tempForm         = document.createElement("form");
    tempForm.className   = "step-form";
    var submitBtn        = document.createElement("button");
    submitBtn.className  = "btn btn-primary btn-sm step-form-submit";
    submitBtn.innerHTML  = "Save";
    submitBtn.type       = "submit";
    rowInput.name        = stepId;
    rowInput.value       = stepText;
    rowInput.className   = "steps-input form-control";
    row.innerHTML        = "";
    tempForm.appendChild(rowInput);
    tempForm.appendChild(submitBtn);
    row.appendChild(tempForm); 
  },
  addStep: function(){
  // ADD a step
  },
  setFooter: function(content){
   $(this.modal + " .modal-footer").html(content); 
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
     }  
  } 
});

