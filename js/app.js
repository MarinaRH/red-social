// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMwb8xeaU4tRKNGyfPWA6uH9K7Im9BJNk",
  authDomain: "red-social-9232b.firebaseapp.com",
  databaseURL: "https://red-social-9232b.firebaseio.com",
  projectId: "red-social-9232b",
  storageBucket: "red-social-9232b.appspot.com",
  messagingSenderId: "900037571899"
};

firebase.initializeApp(config);

// inicializar formulario materialize

$(document).ready(function() {

  $('select').material_select();
  $('.modal').modal();

  // variables crear nuevo usuario
  var $btnCreate = $('#btnCreate');
  var $emailCreate = $('#emailCreate');
  var $passwordCreate = $('#passwordCreate');
  var $firstName = $('#firstName');
  var $lastName = $('#lastName');
  var $day = $('#day');
  var $año = $('#año');
  var $passwordCreate = $('#passwordCreate');
  var $container = $('#container');

  // variables iniciar sesion
  var $btnLogIn = $('#btnLogIn');
  var $email = $('#email');
  var $password = $('#password');


  $firstName.on('keyup', validateName);
  $firstName.on('keyup', validatingNewUsers);
  $lastName.on('keyup', validateLastName);
  $lastName.on('keyup', validatingNewUsers);
  $emailCreate.on('keyup', validateEmail);
  $emailCreate.on('keyup', validatingNewUsers);
  $day.on('keyup', validateDay);
  $day.on('keyup', validatingNewUsers);
  $año.on('keyup', validateAño);
  $año.on('keyup', validatingNewUsers);

  // validando nombre de usuario
  function validateName() {
    var name = false;
    var regex = /^[a-zA-Z]*$/;
    if (regex.test($($firstName).val()) && $firstName.val().length >= 3) {
      name = true;
     }
    return name;
  }

  // validando apellidos
  function validateLastName() {
    var name = false;
    var regex = /^[a-zA-Z]*$/;
    if (regex.test($($lastName).val()) && $lastName.val().length >= 3) {
      name = true;
    }
    return name;
  }

  // validando email
  function validateEmail() {
    var email = false;
    var regex = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/);
    if (regex.test($($emailCreate).val()) && $emailCreate.val().length > 6) {
      email = true;
      localStorage.email = $emailCreate.val();
    }
    return email;
  }

  function validateDay() {
    localStorage.password = $passwordCreate.val();
    return $day.val().length === 2;
  }

  function validateAño() {
    return $año.val().length === 4;
  }

  // validando formulario de crear nuevo usuario
  function validatingNewUsers() {
    if (validateName() && validateLastName() && validateEmail() && validateDay() && validateAño()) {
      $btnCreate.removeClass('disabled');
    }
  }

  // crear nuevo usuario con firebase
  function createNewUsers() {
    firebase.auth().createUserWithEmailAndPassword($emailCreate.val(), $passwordCreate.val())
      .then(function() {
        $btnCreate.removeClass('disabled');
        verifyUsers();
      })

      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorMessage);
    });
  }


 // iniciar sesion
  function logIn() {
    firebase.auth().signInWithEmailAndPassword($email.val(), $password.val())
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorMessage);
    });
  }

  function observer() {
      firebase.auth().onAuthStateChanged(function(user) {
        var $photoProfile = $('#photoProfile');
        var $nameUsers = $('#nameUsers');
        var $usersComent = $('.usersComent');
        var $comentsPhoto = $('.comentsPhoto');


      if (user) {
        console.log('usuario activo');
        var displayName = user.displayName;
        localStorage.displayName = user.displayName;
        var email = user.email;
        console.log(email);
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        console.log(photoURL);

        localStorage.photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        $photoProfile.attr('src', photoURL);
        $comentsPhoto.attr('src', photoURL);
        $nameUsers.text(displayName);
        $usersComent.text(displayName);

      } else {
        console.log('no existe usuario activo');
      }
    });
  }
  observer();

  var user = null;
  var usuariosConectados = null;
  var database = firebase.database();
  var conectadoKey = '';
  var $btnGoogle = $('#btnGoogle');

  $btnGoogle.on('click', logInGoogle);

  function logInGoogle() {
    event.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      user = result.user;
      console.log(user);

      observer();
      initApp();

      window.location.href = '../views/home.html';
    });
  }


  function initApp() {
    usuariosConectados = database.ref('/connected');
    login(user.uid, user.displayName || user.email);
  }

  function login(uid, name) {
    var conectado = usuariosConectados.push({
      uid: uid,
      name: name
    });
    conectadoKey = conectado.key;
    console.log(conectadoKey);
  }

  // para agregar amigos
  $('#btn-add').on('click',function(e){
    $(this).addClass('hide');
    $('#btn-friend').removeClass('hide');
  });

  $('#friend-active').on('click',function(e){
    $('.actives').toggleClass('hide');
  })

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

    $('#publicacion').prepend('<div class="col s12 m12 border-post"><div id="public-header" class="col s12 m12"><br><div class="col s2 m2"><img class=" img-perfil photoUser"></div><div class="col s10 m10  userName"></div><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><div class="text-public"><p>'+ texto +'</p></div></div><div class="col s12 m12 divider"></div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="contador"></p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "><input id="input-comment" placeholder="Add a comment.." type="text"></div><br></div>');

    var $photoUser = $('.photoUser');
    var $userName = $('.userName');
    $photoUser.attr('src', localStorage.photoURL);
    $userName.text(localStorage.displayName);

    $btnPost.attr('disabled', true);
    $btnPost.removeClass('btn-grad');
    $newPost.focus();
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
    $('#publicacion').prepend('<div class="col s12 m12 border-post"><div id="public-header" class="col s12 m12"><br><div class="col s2 m2"><img class=" img-perfil photoUser"></div><div class="col s10 m10  userName"></div><br><span class="grey-text">Publicado a las :'+getTime()+'</span><br><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12 "><img class="img-file img-post center-block" src="#"</div><div class="col s12 m12 "><a><i class="fa fa-thumbs-o-up icon-public" id="icon-like"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><p class="right grey-text" id="contador"> </p><div id="add-comment" class="col s12 m12"></div></div><div class="col s12 m12 "><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');
    $('.img-post').attr('src', e.target.result);

    var $photoUser = $('.photoUser');
    var $userName = $('.userName');
    $photoUser.attr('src', localStorage.photoURL);
    $userName.text(localStorage.displayName);
  };

  reader.readAsDataURL(this.files[0]);

  });

  // comentar las publicaciones
  $(document).keypress('#input-comment',function(e) {
    if (e.which == 13 ) {
      var comentario = $('#input-comment').val();
      $('#input-comment').val('');
      if(comentario){
        $('#add-comment').append('<div class="col s1 m1"><img id="photoProfile" class=" img-perfil" alt="" ></div><div class="col s10 m10 white usersComent"></div><p class="col s11 m11 ">'+comentario+'<span  class="right grey-text">publicado : '+getTime()+'</span></p><');
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

  var $containerStore = $('#container-store');


  function showStore() {
    for (var i = 0; i < data.length; i++) {
      var $store = $('<div></div>');
      $store.addClass('collection box');
      $store.attr('data-name', data[i].nameTienda);
      $store.attr('id', 'modal1');
      $containerStore.append($store);

      var $text = $('<p></p>');
      $text.addClass('title');
      $text.text(data[i].producto);
      $store.append($text);

      var $img = $('<img/>');
      $img.addClass('responsive-img cont-img');
      $img.attr('src', data[i].image);
      $store.append($img);
    }
  }

  showStore();

  var $filtro = $('#filtro');

  // filtro para el input
 $filtro.keyup(function() {

   var nombre = $(this).val();
   $('.collection').hide();
   $('.collection').each(function(){
     var search = $(this).text().toLowerCase();
     if (search.indexOf(nombre) !== -1) {
       $(this).show();
     }
   });
 })

 var $collection = $('.collection');
 $collection.on('click', showProfileStore);

  function showProfileStore() {
    window.location.href = '../views/store.html';

  }











});
