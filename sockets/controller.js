const TicketControl = require("./ticket-control");

const ticketControl = new TicketControl();

const socketController = (clienteConectado) => {

    clienteConectado.emit('ultimo-ticket', ticketControl.ultimoTicket)

    clienteConectado.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //TODO notificar que hay un nuevo ticket pendiente de asignar
        clienteConectado.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    
    })

    clienteConectado.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }
        const ticketAtender = ticketControl.atenderTicket(escritorio);
        if (!ticketAtender) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            clienteConectado.broadcast.emit('estado-actual', ticketControl.ultimos4);
            clienteConectado.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
            clienteConectado.emit('tickets-pendientes', ticketControl.tickets.length)        
            callback({
                ok: true,
                ticketAtender
            })
        }
    })
    clienteConectado.emit('estado-actual',ticketControl.ultimos4);
    clienteConectado.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    clienteConectado.emit('tickets-pendientes', ticketControl.tickets.length)
}


module.exports = {
    socketController
}

