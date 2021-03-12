var temac = localStorage.getItem('temac') | 0;
if(window.location.pathname=="/index.html"){
$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/post/',
  dataType: 'json',
  success: function(msg){
    for(var i in msg.jsonData) {
      alert(msg[i]);
  }
      console.log("Mensagem:"+ (JSON.stringify(msg)));
  }
});
}
jQuery(document).ready(function(){
    $( "#loader" ).delay(600).fadeOut(400, function(){
        $( "#corpo" ).delay(200).fadeIn(400);$("#corpo").css("visibility", "visible");
    });  
});
function initial(){
    var bgc = document.getElementsByTagName("body")[0];
    bgc.classList.add("font-monospace");
}