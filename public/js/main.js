//Main js file

var lists = document.querySelectorAll(".nav li");
arr = [];
for(var i = lists.length; i--; arr.unshift(lists[i]));
arr.forEach(function(item){ 

    if( item.childNodes[0].parentNode.className == 'active' ) item.childNodes[0].parentNode.className = ''; 
    if( window.location.href == item.childNodes[0] ) item.childNodes[0].parentNode.className = 'active' 
});

