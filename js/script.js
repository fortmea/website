$.ajax({
  type: 'POST',
  url: 'https://xue-hua-piao.herokuapp.com/usuario/',
  data: { 
      'id': '1'
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
    if((Cookies.get('tema')!=null)&&(Cookies.get('tema')!="")){
        temanew();
    }
}
function temanew(){
  if((Cookies.get('tema')=="")||(Cookies.get('tema')==null)){
    var list = document.getElementsByClassName("bg-light");
    console.log(list);
    var listabtn = document.getElementsByClassName("btn-light");
    var listafrmctrl = document.getElementsByClassName("form-control");
    for(i = 0;i<listafrmctrl.length;i++){
      listafrmctrl[i].classList.add("bg-dark");
      listafrmctrl[i].classList.remove("bg-light");
    }
    for(i = 0;i<listabtn.length;i++){
      listabtn[i].classList.add("btn-dark");
      listabtn[i].classList.remove("btn-light");
    }
    var i = 0;
    while(i<list.length){
      if(list[i].tagName == 'NAV'){
        list[i].classList.add("navbar-dark");
        list[i].classList.remove("navbar-light");
        list[i].classList.add("bg-dark");
        list[i].classList.remove("bg-light");
      }
      list[i].classList.add("bg-dark");
      list[i].classList.remove("bg-light");
      i++;
    }
    document.getElementsByTagName("body")[0].style.color = "white";
    document.getElementsByTagName("body")[0].style.backgroundColor = "black";
    Cookies.set('tema','1');
  }else{
    var list = document.getElementsByClassName("bg-dark");
    var listabtn = document.getElementsByClassName("btn-dark");
    var listafrmctrl = document.getElementsByClassName("form-control");
    for(i = 0;i<listafrmctrl.length;i++){
      listafrmctrl[i].classList.add("bg-light");
      listafrmctrl[i].classList.remove("bg-dark");
    }
    for(i = 0;i<listabtn.length;i++){
      listabtn[i].classList.add("btn-light");
      listabtn[i].classList.remove("btn-dark");
    }
    var i = 0;
    while(i<list.length){
      if(list[i].tagName == 'NAV'){
        list[i].classList.add("navbar-light");
        list[i].classList.remove("navbar-dark");
        list[i].classList.add("bg-light");
        list[i].classList.remove("bg-dark");
      }
      list[i].classList.add("bg-light");
      list[i].classList.remove("bg-dark");
      i++;
    }
    document.getElementsByTagName("body")[0].style.color = "black";
    document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    Cookies.remove('tema');
  }
}
