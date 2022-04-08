# COLA DE TICKETS

## **FUNCIONALIDAD**

<br>

Esta aplicación permite:

- Asignar tickets a los clientes.
- Crear escritorios en los que se podrá atender los tickets.
- Notificar a todos los escritorios conectados la cantidad de tickets por atender.
- Mostrar en una pantalla general los últimos 4 tickets que estan siendo atendidos en los respectivos escritorios.
- Notificar con un sonido cada vez que un escritorio empiece la atención de un nuevo ticket. **Esta funcionalidad por el momento esta disponible y probada en el navegador Mozilla Firefox.**

<br>

## **TECNOLOGÍAS**

<br>

Para su desarrollo se utilizó:

- Clases del ES6
- Express.js para crear el Webserver.
- Socket.io para crear y gestionar el servidor Websocket.


<br>

## **APLICACIÓN HEROKU**

<br>

La aplicación se encuentra desplegada en:

https://node-cola-tickets.herokuapp.com/ 

<br>

## **RECOMENDACIONES**

<br>

Recuerden reconstruir los módulos de Node con:
```
npm install 
```
Y para correr la aplicación con:
```
node app.js
```