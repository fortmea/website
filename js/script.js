var temac = localStorage.getItem('temac') | 0;
var getName = prompt("Diga-me, visitante... Qual seu nome?");
if((window.location.pathname=="/index.html")||(window.location.pathname=="/")){
$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/post/',
  dataType: 'json',
  success: function(data){
    var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
    for(x in post){
      try{
      let data2 = autor(post[x].autor);
      data2.then(function(data3){
        try{
        var autores = document.getElementsByName("promise["+post[x].autor+"]");
      }catch(error){

      }
        var autordata = jQuery.parseJSON((JSON.stringify(data3)))['data'];
        for(x in autores){

          autores[x].innerHTML = autordata.nome;

        }
      });
    }catch(error){
    }
        var target = document.getElementById( "post-container" );
        var newElement = document.createElement( "div" );
        newElement.style = "padding:1em;margin-top: 5%;";
        if(getName){
            post[x].nome = post[x].nome.replace("Anônimo!",getName+"!");
        }
        newElement.innerHTML = ('<div class="card bg-dark border-info text-light font-monospace" style="padding=1em"><h5 class="card-header bg-dark-50">'+post[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">Ainda não sei o que colocar aqui...</h5><p class="card-text">'+post[x].conteudo+'</p><p><cite name="promise['+post[x].autor+']">promise['+post[x].autor+']</cite></p><a onclick=read('+post[x].id+') class="btn btn-primary">Go somewhere</a></div> </div>');
        $( target ).after( newElement );
    }
  }
});
}
function autor(id){
 return Promise.resolve($.ajax({
    type: 'POST',
    url: 'https://xue-hua-piao.herokuapp.com/usuario/',
    dataType: 'json',
   data:{
     'id':id
  }}));
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