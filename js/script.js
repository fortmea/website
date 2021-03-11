$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/usuario/',
  data: { 
      'id': '1'
  },
  dataType: 'json',
  success: function(msg){
      console.log("Mensagem:"+ (msg));
  }
});
jQuery(document).ready(function(){
    $( "#loader" ).delay(800).fadeOut(400, function(){
        $( "#corpo" ).fadeIn(400);$("#corpo").css("visibility", "visible");
    });  
    
});
function initial(){
    var bgc = document.getElementsByTagName("body")[0];
    var btst = document.getElementById("mtbtn");
    bgc.classList.add("font-monospace");
    btst.style.textAlign = "left";
    if((getCookie('tema')!=null)&&(getCookie('tema')!="")){
        settheme();
    }
}
function settheme(){
    var bgc = document.getElementsByTagName("body")[0];
    var btst = document.getElementById("mtbtn");
    var nav = document.getElementById("nav1");
    if(bgc.style.backgroundColor=="black"){
        bgc.style.backgroundColor = "white";
        bgc.style.color = "black";
        nav.classList.remove("navbar-dark");
        nav.classList.remove("bg-dark");
        nav.classList.add("navbar-light");
        nav.classList.add("bg-light");
        btst.classList.remove("btn-dark");
        btst.classList.add("btn-light");
        btst.innerHTML = "<i class='gg-sun'></i>Modo noturno";
        delete_cookie('tema','/',window.location.hostname);
    }else{
        bgc.style.color = "white";
        bgc.style.backgroundColor = "black";
        nav.classList.remove("navbar-light");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
        btst.classList.add("btn-dark");
        btst.classList.remove("btn-light");
        btst.innerHTML = "<i class='gg-moon'></i>Modo diurno";
        setCookie('tema','1');
    }
}
function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function delete_cookie( name, path ) {
    if( getCookie( name ) ) {
        var dbg =  name + "=" +
        ((window.location.pathname) ? ";path="+window.location.pathname:"") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = dbg;
    }
  }