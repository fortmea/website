var temac = localStorage.getItem('temac') | 0;
var username;
jQuery(document).ready(function(){
    var $_GET=[];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
    if(!$_GET['uid']){
      window.location.pathname=window.location.pathname.replace("profile.html","404.html");
      return;
    }
    $.ajax({
        type: 'POST',
        url: 'https://xue-hua-piao.herokuapp.com/usuario/',
        dataType: 'json',
        data: { 
          'id':$_GET['uid']
        },
        success: function(data){
          var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
          var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
          var data =  new Date();
          data.setTime(post.date);
         
          if($_GET['uid']==21){
            post.nome = "Sr. Supremo Rei do Universo " + post.nome
          }
          username = post.nome;
          var target = document.getElementById( "profile" );
          if(tipo==false){
            $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="Perfil de '+post.nome+'">');
            var newElement = document.createElement( "div" );
            newElement.innerHTML=`<div class="card mb-3 bg-dark font-monospace" >
            <div class="row g-0" >
              <div class="col-md-4 d-flex justify-content-between" >
              <div class="spinner-border text-primary" role="status" style="width:8em;height:8em" id="imgloadstatus">
              <span class="visually-hidden">Carregando imagem</span>
            </div>
                <img id="prfimg">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">`+post.nome+`</h5>
                  <p class="card-text">Email:<a style="text-decoration:none" href="mailto:`+post.email+`">`+post.email+`</a>.</p>
                  <p class="card-text"><small >Membro desde: `+data+`</small></p>
                </div>
              </div>
            </div>
          </div>`
            $(target).append(newElement);
            setimg(post.image);
            
          }else{
            var newElement = document.createElement( "div" );
            newElement.innerHTML='<div class="alert alert-danger" role="alert"><div class="header"><h4>Erro!</h4></div><br>'+post+'</div>'
            $(target).append(newElement);
            initial();
          }
          
        }
      });
      
});
function load_posts(){
  var $_GET=[];
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
  $.ajax({
    type: 'POST',
    url: 'https://xue-hua-piao.herokuapp.com/userpost/',
    dataType: 'json',
    data: { 
      'uid':$_GET['uid']
    },
    success: function(data){
        var post2 = jQuery.parseJSON((JSON.stringify(data)))['data'];
        var target2 = document.getElementById( "post-container" );
        for(x in post2){
        var newElement = document.createElement( "div" );
        var data = new Date(post2[x].data);
        data.setSeconds(0, 0);
        var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
        stamp = stamp.replace("00:00","");
        newElement.classList="float-none";
        var conteudo = post2[x].conteudo;
        
        newElement.innerHTML = ('<div class="card bg-dark font-monospace buttonOverlay mb-3" style="padding=1em"><h5 class="card-header bg-dark bg-gradient">'+post2[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">'+post2[x].resumo+'</h5><p class="card-text">'+conteudo+'</p><p><img></img><cite>'+username+'</cite>,<br>'+stamp+'</p>    </div> </div>');
        $(target2).append(newElement);
        
    }
    tema(true);
    }
});
}
function loader(){
  $( "#loader" ).delay(600).fadeOut(400, function(){
    $( "#corpo" ).delay(200).fadeIn(400);$("#corpo").css("visibility", "visible");
});
}
function setimg(imgdata){
  if(imgdata==null){
    var img = document.getElementById("prfimg");
    img.src = "resources/icons8-dinosaur.svg";
    img.classList.add("img-thumbnail");
    initial();
    load_posts();
}else{
    imagem = imgdata;
    var img = document.getElementById("prfimg");
    img.src = imagem;
    img.classList.add("img-thumbnail");
    initial();
    load_posts(); 
}
var imgloadstatus = document.getElementById("imgloadstatus");
    imgloadstatus.remove();
    
}

function initial(){
  var bgc = document.getElementsByTagName("body")[0];
  bgc.classList.add("font-monospace");
  tema(true);
  loader();
}
function tema(ini){
  if(!ini){
    temac++;
    localStorage.setItem('temac',temac);
  }
  for(var a = 0;a<150;a++){
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
      var listacard = document.getElementsByClassName("card");
      for(var b = 0; b < listacard.length;b++){
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