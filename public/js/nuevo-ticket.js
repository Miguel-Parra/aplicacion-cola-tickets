const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io(); // io es un metodo del la libreria de socket.io

socket.on('connect', () => {
    btnCrear.disabled = false; //habilitar el boton si se conecta
})

socket.on('disconnect', () => {
    btnCrear.disabled = true //deshabilitar el boton hasta que se conecte
})

socket.on('ultimo-ticket', (ultimoTicket) => {
    lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`
})

btnCrear.addEventListener('click', () => {
    socket.emit('siguiente-ticket', null, (ticketAsignado) => {
        lblNuevoTicket.innerText = ticketAsignado;
    })
})