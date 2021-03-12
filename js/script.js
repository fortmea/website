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
    if(Cookies.get('tema')){
      tema();
    }
}
function tema(string){
  if(Cookies.get('tema')==''){
    var list = document.getElementsByClassName("bg-dark");
    var listabtn = document.getElementsByClassName("btn-dark");
    var listafrmctrl = document.getElementsByClassName("form-control");
    var listacard = document.getElementsByClassName("card");
    for(i = 0;i<listafrmctrl.length;i++){
      listafrmctrl[i].classList.replace('bg-dark','bg-light');
    }
    for(i = 0;i<listacard.length;i++){
      listacard[i].classList.replace('bg-dark','bg-light');
    }
    for(i = 0;i<listabtn.length;i++){
      listabtn[i].classList.replace('btn-dark','btn-light');
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
    document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    Cookies.set("tema", '', { expires: 7, path: '/',domain: '.joaowalteramadeu.me' });
    }
    if(Cookies.get('tema')=='dark'){
    var list = document.getElementsByClassName("bg-light");
    var listabtn = document.getElementsByClassName("btn-light");
    var listafrmctrl = document.getElementsByClassName("form-control");
    var listacard = document.getElementsByClassName("card");
    for(i = 0;i<listafrmctrl.length;i++){
      listafrmctrl[i].classList.replace('bg-light','bg-dark');
    }
    for(i = 0;i<listacard.length;i++){
      listacard[i].classList.replace('bg-light','bg-dark');
    }
    for(i = 0;i<listabtn.length;i++){
      listabtn[i].classList.replace('btn-light','btn-dark');
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
    document.getElementsByTagName("body")[0].style.backgroundColor = "black";
    if(!string){
    Cookies.set("tema", 'dark', { expires: 7, path: '/',domain: '.joaowalteramadeu.me' });
    }
  }
return Cookies.get('tema');
}
