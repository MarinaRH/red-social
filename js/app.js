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
});
