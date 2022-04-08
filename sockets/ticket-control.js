const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimoTicket = 0; // para saber en cual ticket estoy atendiendo
        this.hoy = new Date().getDate(); //para comparar despues con la DB 
        this.tickets = []; // tickets pendientes
        this.ultimos4 = []; //para mostrarlos en pantalla
        this.init();
    }

    get toJson() { //para llamar las propiedades que se van a grabar
        return {
            ultimoTicket: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() { //para inicializar el servidor o ls clase
        const { hoy, tickets, ultimoTicket, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimoTicket = ultimoTicket;
            this.ultimos4 = ultimos4;
        } else { // es otro dia 
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimoTicket += 1;
        const ticket = new Ticket(this.ultimoTicket, null)
        this.tickets.push(ticket);
        this.guardarDB();
        return `Ticket ${ticket.numero}`
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift(); //extrae el primero y lo elimina
        ticket.escritorio = escritorio; //ticket que voy a atender ahora
        this.ultimos4.unshift(ticket) //coloca en el primer puesto
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //elimina el 5to
        }
        this.guardarDB();
        return ticket
    }
}

module.exports = TicketControl;