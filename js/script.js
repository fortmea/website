var temac = localStorage.getItem('temac') | 0;
$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/usuario/',
  data: { 
      'id': ''
  },
  dataType: 'json',
  success: function(msg){
      console.log("Mensagem:"+ (JSON.stringify(msg)));
  }
});
jQuery(document).ready(function(){
    $( "#loader" ).delay(600).fadeOut(400, function(){
        $( "#corpo" ).delay(200).fadeIn(400);$("#corpo").css("visibility", "visible");
    });  
});
function initial(){
    var bgc = document.getElementsByTagName("body")[0];
    var btst = document.getElementById("mtbtn");
    bgc.classList.add("font-monospace");
    btst.style.textAlign = "left";
}