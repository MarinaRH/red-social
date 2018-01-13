$(document).ready(function() {
  // habilitar boton para publicar
  var $btnPost = $('#btn-text');
  var $newPost = $('#new-text');
  $newPost.on('input', function() {
  $btnPost.attr('disabled', false);
  $btnPost.addClass('btn-grad');
  });

  // funcion para agregar publicaciones
  var ShowPublic = function(e){
  $btnPost.on('click', function(e) {
    var texto = $newPost.val();
    $newPost.val('');
    $('#publicacion').prepend('<div class="col s12 m12 border-post"><div id="public-header" class="col s12 m12"><div class="col s2 m2"><img  class="comentsPhoto img-perfil "></div><div class="col s10 m10  usersComent"><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><div class="text-public"><p>'+ texto +'</p></div></div><div class="col s12 m12 divider"></div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="contador"></p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');

    $btnPost.attr('disabled', true);
    $btnPost.removeClass('btn-grad');
  })
  }

  ShowPublic();

  // Función para agregar hora
  function getTime() {
  var currentDate = new Date();
  var hh = currentDate.getHours();
  var mm = currentDate.getMinutes();
  return hh + ':' + ((mm < 10 ? '0' : '') + mm);
  }

  // funcion para postear imagen
  $('#file-select').on('click', function(e) {
  e.preventDefault();
  $('#file').click();
  });

  $('input[type=file]').change(function() {
  var file = (this.files[0].name).toString();
  var reader = new FileReader();

  reader.onload = function(e) {
    $('#publicacion').prepend('<div class="col s12 m12 border-post"><div id="public-header" class="col s12 m12"><div class="col s2 m2"><img  class="comentsPhoto img-perfil "></div><div class="col s10 m10  usersComent"><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><img class="img-file img-post center-block" src="#"</div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="contador"> </p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');
    $('.img-post').attr('src', e.target.result);
  };

  reader.readAsDataURL(this.files[0]);
  // <img class="img-file img-post center-block" src="#">
  });

  // comentar las publicaciones
  $(document).keypress('#input-comment',function(e) {
    if (e.which == 13 ) {
      var comentario = $('#input-comment').val();
      $('#input-comment').val('');
      if(comentario){
        $('#add-comment').append('<div class="col s1 m1"><img class="comentsPhoto img-comment" alt="" ></div><div class="col s10 m10 white usersComent"></div><p class="col s11 m11 ">'+comentario+'<span  class="right grey-text">publicado : '+getTime()+'</span></p>');
      }else{
        $('#input-comment').val('');
      }
    }
  });

  // contador para likes

  $(document).on('click','#icon-like',function(e){
    var cont=1;
    $(this).toggleClass('pink-text');
    $('#contador').html(cont +' '+'like');
    cont++;
  });
});