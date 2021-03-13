var temac = localStorage.getItem('temac') | 0;
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
        newElement.style = "padding:1em;";
        //if(getName){
        //    post[x].nome = post[x].nome.replace("Anônimo!",getName+"!");
        //}
        min = Math.ceil(15000);
        max = Math.floor(1);
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        var data = new Date(post[x].data);
        data.setSeconds(0, 0);
        var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
        newElement.innerHTML = ('<div class="card bg-dark border-info font-monospace" style="padding=1em"><h5 class="card-header bg-dark bg-gradient">'+post[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">'+post[x].resumo+'</h5><p class="card-text">'+post[x].conteudo+'</p><p><img></img><cite id="autor'+post[x].autor+" "+rand+'""><i class="gg-loadbar-alt"></i></cite><br>'+stamp+'</p><a onclick=read('+post[x].id+') class="btn btn-primary">Ir para publicação</a></div> </div>');
        nomeautor(post[x].autor,rand);
        $( target ).after( newElement );
    }
  }
});
//}
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
    if(Cookies.get('tema_claro')){
      tema_claro();
    }else if(Cookies.get('tema_escuro')){
      Cookies.get('tema_escuro');
    }
}
function tema_claro(){
    var list = document.getElementsByClassName("bg-dark");
    var listabtn = document.getElementsByClassName("btn-dark");
    var listafrmctrl = document.getElementsByClassName("form-control");
    var listacard = document.getElementsByClassName("card");
    for(var i in listafrmctrl.length){
      listafrmctrl[i].classList.replace('bg-dark','bg-light');
    }
    for(var i in listacard.length){
      listacard[i].classList.replace('bg-dark','bg-light');
    }
    for(var i in listabtn.length){
      listabtn[i].classList.replace('btn-dark','btn-light');
      if(listabtn[i].innerHTML=='<i class="gg-moon"></i>Modo diurno'){
        listabtn[i].innerHTML = '<i class="gg-sun"></i>Modo noturno';
      }
    }
    var i = 0;
    while(i<list.length){
      if(list[i].tagName == 'NAV'){
        list[i].classList.replace('navbar-dark','navbar-light');
      }
        list[i].classList.replace('bg-dark','bg-light');
      i++;
    }
    document.getElementsByTagName("body")[0].style.color = "black";
    document.getElementsByTagName("body")[0].style.classList = "bg-light container text-dark";
    Cookies.set("tema_claro", 'light', { expires: 7, path: '/',domain: '.joaowalteramadeu.me' });
    Cookies.remove('tema_escuro', { path: '', domain: '.joaowalteramadeu.me' });
}
function tema_escuro(){
    var list = document.getElementsByClassName("bg-light");
    var listabtn = document.getElementsByClassName("btn-light");
    var listafrmctrl = document.getElementsByClassName("form-control");
    var listacard = document.getElementsByClassName("card");
    for(var i in listafrmctrl.length){
      listafrmctrl[i].classList.replace('bg-light','bg-dark');
    }
    for(var i in listacard.length){
      listacard[i].classList.replace('bg-light','bg-dark');
    }
    for(var i in listabtn.length){
      listabtn[i].classList.replace('btn-light','btn-dark');
      if(listabtn[i].innerHTML=="<i class='gg-sun'></i>Modo noturno"){
        listabtn[i].innerHTML = "<i class='gg-moon'></i>Modo diurno";
      }
    }
    var i = 0;
    while(i<list.length){
      if(list[i].tagName == 'NAV'){
        list[i].classList.replace('navbar-light','navbar-dark');
      }
      list[i].classList.replace('bg-light','bg-dark');
      i++;
    }
    document.getElementsByTagName("body")[0].style.color = "white";
    document.getElementsByTagName("body")[0].style.classList = "bg-dark container text-light";
    Cookies.set("tema", 'dark', { expires: 7, path: '/',domain: '.joaowalteramadeu.me' });
    Cookies.remove('tema_claro', { path: '', domain: '.joaowalteramadeu.me' });
    
}
