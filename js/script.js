var temac = localStorage.getItem('temac') | 0;
var getName = prompt("Diga-me, visitante... Qual seu nome?");
//if((window.location.pathname=="/index.html")||(window.location.pathname=="/")){
$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/post/',
  dataType: 'json',
  success: function(data){
    var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
    
    for(x in post){
        var target = document.getElementById( "post-container" );
        var newElement = document.createElement( "div" );
        newElement.style = "padding:1em;margin-top: 5%;";
        if(getName){
            post[x].nome = post[x].nome.replace("Anônimo!",getName+"!");
        }
        newElement.innerHTML = ('<div class="card bg-dark border-info text-light font-monospace" style="padding=1em"><h5 class="card-header bg-dark-50">'+post[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">Ainda não sei o que colocar aqui...</h5><p class="card-text">'+post[x].conteudo+'</p><p><cite>João</cite></p><a onclick=read('+post[x].id+') class="btn btn-primary">Go somewhere</a></div> </div>');
        $( target ).after( newElement );
      //console.log(msg[i]);
      //console.log("Mensagem:"+ (JSON.stringify(msg)));
    }
  }
});
//}
jQuery(document).ready(function(){
    $( "#loader" ).delay(600).fadeOut(400, function(){
        $( "#corpo" ).delay(200).fadeIn(400);$("#corpo").css("visibility", "visible");
    });  
});
function initial(){
    var bgc = document.getElementsByTagName("body")[0];
    bgc.classList.add("font-monospace");
}