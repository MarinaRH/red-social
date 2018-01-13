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
    $('#publicacion').append('<div class="col s12 m12 border-post"><div id="public-header" class="col s12 m12"><div class="col s2 m2"><img  class="comentsPhoto img-perfil "></div><div class="col s10 m10  usersComent"><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><div class="text-public"><p>'+ texto +'</p></div></div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="number-likes"> likes</p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');

    $btnPost.attr('disabled', true);
    $btnPost.removeClass('btn-grad');
  })
}

ShowPublic();

// $(document).on('click', '.like-btn', function() {
//     console.log('click success!');
//     $(this).toggleClass('btn-primary').toggleClass('btn-secondary').toggleClass('font-weight-bold');
//   });

// Función para agregar hora
function getTime() {
  var currentDate = new Date();
  var hh = currentDate.getHours();
  var mm = currentDate.getMinutes();
  return hh + ':' + ((mm < 10 ? '0' : '') + mm);
}


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

// comentar las publicaciones
// $('#input-comment, #input-com').keypress(function(event) {
//     if (event.which == 13 ) {
//       event.preventDefault();
      // alert("Ha pulsado la tecla enter");
//       var comentario = $('#input-comment').val();
//       var comentar=$('#input-com').val();
//       $('#input-comment').val('');
//       $('#input-com').val('');
//       $('#add-comment').append('<div class="col s1 m1"><img class="comentsPhoto img-comment" alt="" ></div><div class="col s10 m10 white usersComent"><br></div><p class="col s11 m11 ">'+comentario+'<span  class="right grey-text">publicado : '+getTime()+'</span></p>');
//       $('#add-com').append('<div class="col s1 m1"><img src="../assets/images/perfil1.jpg" alt="" class="img-comment"></div> <p class="col s11 m11 ">'+comentar+'<span  class="right grey-text">publicado : '+getTime()+'</span></p>');
//     }
//   });

 
// contador para likes

$('#icon-like').on('click',function(e){
  var cont=1;
  $(this).toggleClass('pink-text');
  $('#contador').html(cont +'like');
  cont++;
});