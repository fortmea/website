var temac = localStorage.getItem('temac') | 0;
if((window.location.pathname=="/index.html")||(window.location.pathname=="/")||(window.location.pathname=="/site/website/index.html")){
$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/post/',
  dataType: 'json',
  success: function(data){
    var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
    var target = document.getElementById( "post-container" );
    var modal_target = document.getElementById( "modal-container" );
    if(target){
    for(x in post){
        var newElement = document.createElement( "div" );
        var modal = document.createElement("div");
        newElement.style = "padding:1em;";
        min = Math.ceil(15000);
        max = Math.floor(1);
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        var rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
        var data = new Date(post[x].data);
        data.setSeconds(0, 0);
        var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
        newElement.classList="float-none";
        var conteudo = post[x].conteudo;
        if(conteudo.length>=100){
          conteudo = conteudo.substring(0,100) +"...";
        }
        newElement.innerHTML = ('<div class="card bg-dark font-monospace buttonOverlay mb-3" style="padding=1em"><h5 class="card-header bg-dark bg-gradient">'+post[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">'+post[x].resumo+'</h5><p class="card-text">'+conteudo+'</p><p><img></img><cite id="autor'+post[x].autor+" "+rand+'""><i class="gg-loadbar-alt"></i></cite><br>'+stamp+'</p><button class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modal'+post[x].id+'">Ir para publicação</button></div> </div>');
        modal.innerHTML=('<div class="modal fade" tabindex="-1"  id="modal'+post[x].id+'" aria-labelledby="modalaria'+post[x].id+'" style="display:none"aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm"><div class="modal-content bg-dark"><div class="modal-header"><h5 class="modal-title">'+post[x].resumo+'</h5><button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>'+post[x].conteudo+'</p><p><cite id="autor'+post[x].autor+" "+rand2+'""><i class="gg-loadbar-alt"></i></cite></p></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button></div></div></div></div>');
        nomeautor(post[x].autor,rand);
        nomeautor(post[x].autor,rand2);
        $(target).append(newElement);
        $(modal_target).append(modal);
    }
  }
    tema(true);
  }
}
);
}
/*function create_account(){
  $.ajax({
    type: 'POST',
    url: 'https://xue-hua-piao.herokuapp.com/post/',
    dataType: 'json',
    success: function(data){
      var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
      var target = document.getElementById( "post-container" );
      var modal_target = document.getElementById( "modal-container" );
      if(target){
      for(x in post){
          var newElement = document.createElement( "div" );
          var modal = document.createElement("div");
          newElement.style = "padding:1em;";
          min = Math.ceil(15000);
          max = Math.floor(1);
          var rand = Math.floor(Math.random() * (max - min + 1)) + min;
          var rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
          var data = new Date(post[x].data);
          data.setSeconds(0, 0);
          var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
          newElement.classList="float-none";
          var conteudo = post[x].conteudo;
          if(conteudo.length>=100){
            conteudo = conteudo.substring(0,100) +"...";
          }
          newElement.innerHTML = ('<div class="card bg-dark font-monospace buttonOverlay mb-3" style="padding=1em"><h5 class="card-header bg-dark bg-gradient">'+post[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">'+post[x].resumo+'</h5><p class="card-text">'+conteudo+'</p><p><img></img><cite id="autor'+post[x].autor+" "+rand+'""><i class="gg-loadbar-alt"></i></cite><br>'+stamp+'</p><button class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modal'+post[x].id+'">Ir para publicação</button></div> </div>');
          nomeautor(post[x].autor,rand);
          nomeautor(post[x].autor,rand2);
          $(target).append(newElement);
          $(modal_target).append(modal);
      }
    }
    }
  }
  );
}*/
function login(){
  let email = document.getElementById("InputEmail1").value;
  let hash = document.getElementById("InputPassword1").value;
  $.ajax({
    type: 'POST',
    url: 'https://xue-hua-piao.herokuapp.com/login/',
    dataType: 'json',
    data: { 
      'hash':hash,
      'email':email 
    },
    success: function(data){
      var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
      var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
      var target = document.getElementById( "corpo-login" );
      if(tipo=="true"){
        var newElement = document.createElement( "div" );
        newElement.innerHTML='<div class="alert alert-danger alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
        $(target).append(newElement);
      }else{
        var newElement = document.createElement( "div" );
        newElement.innerHTML='<div class="alert alert-primary alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
        $(target).append(newElement);
      }
          
    }
  }
  );
}
function register(){
  let email = document.getElementById("InputEmail2").value;
  let nome = document.getElementById("InputNome").value;
  $.ajax({
    type: 'POST',
    url: 'https://xue-hua-piao.herokuapp.com/register/',
    dataType: 'json',
    data: { 
      'nome':nome,
      'email':email 
    },
    success: function(data){
      var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
      var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
      var target = document.getElementById( "corpo-registro" );
      if(tipo=="true"){
        var newElement = document.createElement( "div" );
        newElement.innerHTML='<div class="alert alert-danger alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
        $(target).append(newElement);
      }else{
        var newElement = document.createElement( "div" );
        newElement.innerHTML='<div class="alert alert-primary alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
        $(target).append(newElement);
      }
          
    }
  }
  );
}
function nomeautor(id,rand){
  let data2 = autor(id);
  data2.then(function(data3){
    var autor = document.getElementById("autor"+id+" "+rand);
    var autordata = jQuery.parseJSON((JSON.stringify(data3)))['data'];
    autor.innerHTML ="- "+ autordata.nome;
  });
  return id;
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
function tema(ini){
if(!ini){
  temac++;
  localStorage.setItem('temac',temac);
}
for(var a = 0;a<5;a++){
  if(temac%2==1){
    tema_escuro();
  }else{
    tema_claro();
  }
}
}
function tema_claro(){
    try{
    document.getElementById('corpo').classList = "bg-zigzag-light text-dark font-monospace sc4";
    var listafrmctrl = document.getElementsByClassName("form-control");
    for(var a = 0; a< listafrmctrl.length;a++){
      listafrmctrl[a].classList.replace('bg-dark','bg-light');
    }
    var listacard = document.getElementsByClassName("card");
    for(var b = 0; b< listacard.length;b++){
      listacard[b].classList.replace('bg-dark','bg-light');
    }
    var listabtn = document.getElementsByClassName("btn-dark");
    for(var b = 0; b < listabtn.length;b++){
      listabtn[b].classList.replace('btn-dark','btn-light');
    }
    var botaotema = document.getElementById('temabtn');
    botaotema.innerHTML = '<i class="gg-sun"></i>Modo noturno';
    var list = document.getElementsByClassName("bg-dark");
    for(c = 0; c < list.length;c++){
      if(list[c].tagName == 'NAV'){
        list[c].classList.replace('navbar-dark','navbar-light');
      }
        list[c].classList.replace('bg-dark','bg-light');
    }
  }catch(error){
    return;
  }
}
function tema_escuro(){
    try{
    document.getElementById('corpo').classList = "bg-zigzag-dark text-light font-monospace sc4";
    var listafrmctrl = document.getElementsByClassName("form-control");
    for(var i =0; i<listafrmctrl.length;i++){
      listafrmctrl[i].classList.replace('bg-light','bg-dark');
    }
    var listacard = document.getElementsByClassName("card");
    for(var a = 0; a < listacard.length;a++){
      listacard[a].classList.replace('bg-light','bg-dark');
    }
    var listabtn = document.getElementsByClassName("btn-light");
    for(var b =0; b < listabtn.length;b++){
      listabtn[i].classList.replace('btn-light','btn-dark');
    }
    var botaotema = document.getElementById("temabtn");
    botaotema.innerHTML = "<i class='gg-moon'></i>Modo diurno";
    var list = document.getElementsByClassName("bg-light");
    for(c = 0; c<list.length;c++){
      if(list[c].tagName == 'NAV'){
        list[c].classList.replace('navbar-light','navbar-dark');
      }
      list[c].classList.replace('bg-light','bg-dark');
    }
  }catch(error){
return;
}
}
