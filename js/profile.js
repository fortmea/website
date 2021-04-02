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
          var target = document.getElementById( "footer" );
          if(tipo=="true"){
            var newElement = document.createElement( "div" );
            newElement.innerHTML=`<div class="card mb-3 bg-dark" >
            <div class="row g-0">
              <div class="col-md-4">
                <img src="`+post.image+`" class="img-thumbnail"  alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>`
            $(target).append(newElement);
          }else{
            var newElement = document.createElement( "div" );
            newElement.innerHTML='<div class="alert alert-primary alert-dismissible" role="alert">'+post+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
            $(target).append(newElement);
          }
              
        }
      });
});