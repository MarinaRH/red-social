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
     firebase.auth().createUserWithEmailAndPassword($emailCreate.val(), $passwordCreate.val()).catch(function(error) {
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













});
