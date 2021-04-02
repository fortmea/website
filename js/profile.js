jQuery(document).ready(function(){
    var $_GET=[];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
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
          var imagem;
          var data =  new Date();
          data.setTime(post.date);
          if(post.image==null){
              imagem = "resources/icons8-dinosaur.svg";
          }else{
              imagem = post.image
          }
          var target = document.getElementById( "profile" );
          if(tipo==false){
            var newElement = document.createElement( "div" );
            newElement.innerHTML=`<div class="card mb-3 bg-dark" >
            <div class="row g-0">
              <div class="col-md-4">
                <img src="`+imagem+`" class="img-thumbnail">
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
                    
                    newElement.innerHTML = ('<div class="card bg-dark font-monospace buttonOverlay mb-3" style="padding=1em"><h5 class="card-header bg-dark bg-gradient">'+post2[x].nome+'</h5><div class="card-body bg-dark"><h5 class="card-title">'+post2[x].resumo+'</h5><p class="card-text">'+conteudo+'</p><p><img></img><cite>'+post.nome+'</cite>,<br>'+stamp+'</p>    </div> </div>');
                    $(target2).append(newElement);
                }
                }
            });
          }else{
            var newElement = document.createElement( "div" );
            newElement.innerHTML='<div class="alert alert-danger alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
            $(target).append(newElement);
          }
              
        }
      });
});
