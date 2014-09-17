var tessy = window.tessy || {}; 
  
  var lists = document.querySelectorAll(".nav li");
  arr = [];
  for(var i = lists.length; i--; arr.unshift(lists[i]));
  arr.forEach(function(item){ 

      if( item.childNodes[0].parentNode.className == 'active' ) item.childNodes[0].parentNode.className = ''; 
      if( window.location.href == item.childNodes[0] ) item.childNodes[0].parentNode.className = 'active' 
  });



tessy = {

  getUrlParam : function(name){

     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
     results = regex.exec(location.search);
     return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 

   },

  paramsToDropDowns : function(){

    var params = window.location.pathname.split("/").slice(2,5);
    if( params.length > 0){
      params.map(function(param, index){ 
        $(".span10 button")[index].innerHTML = param + '<span class="caret"></span>';
      });
    } 

  }

};
