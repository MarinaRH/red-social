// Initialize Firebase
var config = {
  apiKey: "AIzaSyDKNjzBbhY9GG9XAwbjig7_zk6DnjySntw",
  authDomain: "red-social-mayoristas.firebaseapp.com",
  databaseURL: "https://red-social-mayoristas.firebaseio.com",
  projectId: "red-social-mayoristas",
  storageBucket: "",
  messagingSenderId: "961495248539"
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

  // variables iniciar sesion
  var $btnLogIn = $('#btnLogIn');
  var $email = $('#email');
  var $password = $('#password');

  $btnCreate.on('click', createNewUsers);
  $btnLogIn.on('click', logIn);
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
  $email.on('keyup',validSingUp);
  $password.on('keyup',validSingUp);

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
    return $day.val().length == 2
  }

  function validateAño() {
    return $año.val().length == 4
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

  // validando inicio de sesion
  function validSingUp() {
    if ($email.val() === localStorage.email && $password.val() == localStorage.password ) {
      $btnLogIn.removeClass('disabled');
    }
  }

    // iniciar sesion
  function logIn() {
    alert('Iniciando sesion....');
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
      if (user) {
        // User is signed in.
        console.log('el usuario a iniciado sesion');

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {

        console.log('el usuario esta desconectado');
      }
    });
  }
  observer();

 // enviando correo de verificacion de email
  function verifyUsers() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('enviando correo');
      alert('Registro exitoso')
      alert('enviando correo de verificacion')
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }



  


// *************************************funciones para home
var ShowPublic = function(e){
  $('#btn-text').on('click',function(e){
    var texto = $('#new-text').val();
    $('#new-text').val('');
    $('#publicacion').append('<div id="public-header" class="col s12 m12"><div class="col s2 m2"><img src="../assets/images/perfil1.jpg" alt="" class="circle img-perfil"></div><div class="col s10 m10">Mario Belmont<br><span class="grey-text">Publicado a las :'+getTime()+'</span></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12"><div class="text-public"><p>'+ texto +'</p></div><div class=" col s12 m12 divider"></div></div><div class="col s12 m12"><a><i class="fa fa-thumbs-o-up icon-public"></i></a><a href="#"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><div id="add-comment" class="col s12 m12"></div><div class="col s12 m12"><input id="input-comment" placeholder="Add a comment.." type="text"></div></div>');
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
