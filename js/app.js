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

  // var $close = $('#close');

  // $btnCreate.on('click', createNewUsers);
  // $btnLogIn.on('click', logIn);
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

  // $email.on('keyup',validSingUp);
  // $password.on('keyup',validSingUp);


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
    return $day.val().length == 2;
  }

  function validateAño() {
    return $año.val().length == 4;
  }

  // validando formulario de crear nuevo usuario
  function validatingNewUsers() {

    if (validateName() && validateLastName() && validateEmail() && validateDay() && validateAño()) {
      // $btnCreate.removeClass('disabled');
    }
  }

   // crear nuevo usuarios
  function createNewUsers() {
    firebase.auth().createUserWithEmailAndPassword($emailCreate.val(), $passwordCreate.val())
    .then(function(){
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
     var $coments = $('#coments');
     var $usersComent = $('#usersComent');

     var $dataPhoto = data["anacarlavegam@gmail.com"]["friends"];


     if (user) {
       // User is signed in.
       console.log('usuario activo');
      //  toShow();
       var displayName = user.displayName;
       var email = user.email;
       console.log(email);
       var emailVerified = user.emailVerified;
       console.log(emailVerified);
       var photoURL = user.photoURL;
       console.log(photoURL);
       var isAnonymous = user.isAnonymous;
       var uid = user.uid;
       console.log(uid);
       var providerData = user.providerData;
       console.log(providerData);

       $photoProfile.attr('src', photoURL);
       $coments.attr('src', photoURL);
       $nameUsers.text(displayName);
       $usersComent.text(displayName);

       var $nameFriend = $('#nameFriend');
       var $photoFriend = $('#friend');

        debugger
         for (var i = 0; i < Object.keys(data).length; i++) {
           if (Object.keys(data)[i] === user.email ) {
             for (var j = 0; j < $dataPhoto.length; j++){
               $photoFriend.attr('src', $dataPhoto[j].photo);
               $nameFriend.text($dataPhoto[j].name);
             }

           }
        }

  //
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
$(window).on('unload', singOut);

function logInGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {

   user = result.user;
  console.log(user);
  debugger

  initApp();
});
}

function initApp() {

  usuariosConectados = database.ref('/connected');
  login(user.uid, user.displayName || user.email);

}



function login(uid, name) {
  debugger
  var conectado = usuariosConectados.push({
    uid: uid,
    name: name
  });

  conectadoKey = conectado.key;
  console.log(conectadoKey);
}

function singOut() {
  database.ref('/connected/' + conectadoKey).remove();
}






// *************************************funciones para home
var ShowPublic = function(e){
  $('#btn-text').on('click',function(e){

    observer();

    var texto = $('#new-text').val();
    $('#new-text').val('');
    $('#publicacion').append('<div id="public-header" class="col s12 m12"><div class="col s2 m2"><img  id="coments"  alt="" class="circle img-perfil"></div><div id="usersComent" class="col s10 m10 "><br><span class="grey-text">Publicado a las :'+getTime()+'</span></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12"><div class="text-public"><p>'+ texto +'</p></div><div class=" col s12 m12 divider"></div></div><div class="col s12 m12"><a><i class="fa fa-thumbs-o-up icon-public"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><div id="add-comment" class="col s12 m12"></div><div class="col s12 m12"><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');


  })
}
ShowPublic();


// Función para agregar fecha
function getTime() {
  var currentDate = new Date();
  var hh = currentDate.getHours();
  var mm = currentDate.getMinutes();
  return hh + ':' + ((mm < 10 ? '0' : '') + mm);
}


$("#input-comment").keypress(function( event ) {
  if ( event.which == 13 ) {
     event.preventDefault();
     alert("Ha pulsado la tecla enter");
  }
});


//**********************************+ fin de funciones para home



});
