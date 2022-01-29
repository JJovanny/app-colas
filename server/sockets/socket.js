const { io } = require('../server');
const {TicketControl} = require('../clasess/ticket-control');

let ticketControl = new TicketControl();


io.on('connect', (client) => {

client.on('siguienteTicket', (data, callback) => {

let siguiente = ticketControl.siguiente();

console.log(siguiente);

callback(siguiente);
});


client.emit('estadoActual', 
{actual : ticketControl.getUltimoTicket(),
 ultimos4 : ticketControl.getUltimos4()
});


client.on('atenderTicket', (data, callback) => {

if(!data.escritorio){

return callback({
    err : true, 
    message : 'El escritorio es requerido'
});

}

let atenderTicket = ticketControl.atenderTicket( data.escritorio );

callback(atenderTicket);

//  para todos los clientes que esten escuchando
client.broadcast.emit('ultimos4', {ultimos4 : ticketControl.getUltimos4()});


});


});