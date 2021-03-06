const fs = require('fs');

class Ticket {

constructor(numero, escritorio) {

this.numero = numero;
this.escritorio = escritorio;
}




}





class TicketControl {


constructor() {

this.ultimo = 0;
this.hoy = new Date().getDate();
this.tickets = [];
this.ultimos4 = [];

let data = require('../data/data.json');

// si hoy es diferente al this.hoy, es otro dia de trabajo
if(data.hoy === this.hoy){

this.ultimo = data.ultimo;
this.tickets = data.tickets;
this.ultimos4 = data.ultimos4;

}else{

    this.reiniciarConteo();

}

}


siguiente(){

this.ultimo += 1; 
let ticket = new Ticket(this.ultimo, null);
this.tickets.push(ticket);
this.grabarArchivo();

return `Ticket ${this.ultimo}`;


}


getUltimoTicket(){

return `Ticket ${this.ultimo}`;

}


getUltimos4(){

return this.ultimos4;

}


atenderTicket( escritorio ){

if(this.tickets.length === 0 ) return 'No hay tickets por atender';

let numeroTicket = this.tickets[0].numero;
this.tickets.shift();

let atenderTicket = new Ticket(numeroTicket, escritorio);

let ultim = this.ultimos4;

ultim.unshift(atenderTicket);

if(ultim.length > 4 ){

    ultim.splice(-1,1); //borra el ultimo elemento

} 

console.log('ultimos 4:', this.ultimos4);
this.grabarArchivo();

return atenderTicket;

}


reiniciarConteo(){

this.ultimo = 0;
this.tickets = [];
this.ultimos4 = [];

console.log('se ha inicializado el sistema');

this.grabarArchivo();

}


grabarArchivo(){

let jsonData = {
    ultimo : this.ultimo,
    hoy : this.hoy,
    tickets : this.tickets,
    ultimos4 : this.ultimos4
    };

let jsonString = JSON.stringify(jsonData);

fs.writeFileSync('./server/data/data.json', jsonString);

    
}



}


module.exports = {TicketControl};