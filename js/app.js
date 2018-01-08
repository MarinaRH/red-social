$(document).ready(function(){
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
// var holaMundo = document.getElementById('holaMundo')
// var dbRef = firebase.database().ref().child('text');
// dbRef.on('value', snap => holaMundo.innerText = snap.val() );



var ShowComment = function(e){
  $('#btn-text').on('click',function(e){
    var texto = $('#new-text').val();
    $('#publicacion').append('<div id="public-header" class="col s12 m12"><div class="col s2 m2"><img src="../assets/images/perfil1.jpg" alt="" class="circle img-perfil"></div><div class="col s10 m10">name</div><div class="col s12 m12 divider"></div></div><div id="public-body" class="col s12 m12"><div class="text-public"><p>'+ texto +'</p></div><div class=" col s12 m12 divider"></div></div><div class="col s12 m12"><a><i class="fa fa-thumbs-o-up icon-public"></i></a><a href="#" id="icon-comment"><i class="fa fa-edit icon-public"></i></a><a><i class="fa fa-share icon-public"></i></a><div class="col s12 m12"><input id="input" placeholder="Add a comment.." type="text"></div></div>');

    // objDb.publicacion.push({
    //    		text: texto
    //    	})
    //    guardarDatos(objDb);
  })
}
ShowComment();

$('a#icon-comment').on('click',function(){
  $('input').addClass('blue');
});


// var guardarDatos =(publicacion)=>{
//  	database.ref("/").set(publicacion);
//  }
// var database = firebase.database();
//Leer datos: Usar el método .on('value')
// database.ref("/publicacion").on('value', (snapshot)=>{
// 	let publicacion = snapshot.val();
// 	objDb.publicacion = publicacion;
// 	ShowComment(publicacion);
// });
});