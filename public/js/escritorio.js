var socket = io();
var small = $('small');

                     //los parametros de la url 
var searchParams = new URLSearchParams( window.location.search );

                  // para preguntar si tiene el escritorio
if(!searchParams.has('escritorio')){

window.location = 'index.html';
throw new Error('El escritorio es requerido');

}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('h1').html('Escritorio'+' '+escritorio);



$('button').on('click', function(){

socket.emit('atenderTicket', {escritorio : escritorio}, function(resp) {

console.log(resp);

small.html(resp.numero);

});


});