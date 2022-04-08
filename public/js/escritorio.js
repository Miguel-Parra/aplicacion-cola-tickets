//Referencias HTML 
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParamns = new URLSearchParams(window.location.search);
if (!searchParamns.has('escritorio')) {
    window.location(index.html);
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParamns.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
})
socket.on('disconnect', () => {
    btnAtender.disabled = true;
})

btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, msg, ticketAtender }) => {
        if (!ok) {
            lblTicket.innerText = ' Nadie.'
            console.log(msg);
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = ` Ticket ${ticketAtender.numero}`
    })
})

socket.on('tickets-pendientes', (numeroTickets) => {
    if (numeroTickets === 0) {
        lblPendientes.style.display = 'none';
        divAlerta.style.display = '';
    } else {
        lblPendientes.style.display = '';
        divAlerta.style.display = 'none';
        lblPendientes.innerText = numeroTickets
    }
})

