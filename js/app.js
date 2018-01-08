
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


var holaMundo = document.getElementById('holaMundo')
var dbRef = firebase.database().ref().child('text');
dbRef.on('value', snap => holaMundo.innerText = snap.val() );

// inicializar formulario materialize
$(document).ready(function() {
  $('select').material_select();

  // variables crear nuevo usuario
  var $btnCreate = $('#btnCreate');
  var $emailCreate = $('#emailCreate');
  var $passwordCreate = $('#passwordCreate');
  // variables iniciar sesion
  var $btnLogIn = $('#btnLogIn');
  var $email = $('#email');
  var $password = $('#password');


  $btnCreate.on('click', createNewUsers);
  $btnLogIn.on('click', logIn);

  // crear nuevo usuario
   function createNewUsers() {
     firebase.auth().createUserWithEmailAndPassword($emailCreate.val(), $passwordCreate.val()).then(function(){
       verifyUsers();
     })


     .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
    // iniciar sesion
  function logIn() {
    firebase.auth().signInWithEmailAndPassword($email.val(), $password.val()).catch(function(error) {
        // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
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

  function verifyUsers() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('enviando correo');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

  }



  


// *************************************funciones para home
var ShowComment = function(e){
  $('#btn-text').on('click',function(e){
    var texto = $('#new-text').val();
    $('#publicacion').append('<div id="public-header" class="col s12 m12"><div class="col s2 m2"><img src="../assets/images/perfil1.jpg" alt="" class="circle img-perfil"></div><div class="col s10 m10">Mario Belmont<br><span class="grey-text">Publicado a las :'+getTime()+'</span></div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12"><div class="text-public"><p>'+ texto +'</p></div><div class=" col s12 m12 divider"></div></div><div class="col s12 m12"><a><i class="fa fa-thumbs-o-up icon-public"></i></a><a href="#" id="icon-comment"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><div class="col s12 m12"><input id="input" placeholder="Add a comment.." type="text"></div></div>');
  })
}
ShowComment();

$('a#icon-comment').on('click',function(){
  $('input').addClass('blue');
});

// Función para agregar fecha
function getTime() {
  var currentDate = new Date();
  var hh = currentDate.getHours();
  var mm = currentDate.getMinutes();
  return hh + ':' + ((mm < 10 ? '0' : '') + mm);
}

//**********************************+ fin de funciones para home









});
