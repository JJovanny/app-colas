// Comando para establecer conexion

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

console.log('conectado al servidor');

})


socket.on('disconnect', function() {

console.log('desconectado del servidor');


});


$('button').on('click', function(e) {
e.preventDefault();

socket.emit('siguienteTicket', null, function(siguienteTicket){

label.html(siguienteTicket);

});

socket.on('estadoActual', function(res){

    console.log(res);
    label.html(res.actual);

});

});

