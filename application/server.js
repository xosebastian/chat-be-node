import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
/* import cors from 'cors'; */
import socket from 'socket.io';

import config from './config/env.config';
import Logger from './config/logger.config';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Logger);


const io = socket(server);

io.set('origins', 'https://chat-fe-react.herokuapp.com:* http://chat-fe-react.herokuapp.com:*');


io.on('connection', (client) => {
  console.log(client);
  console.log('Usuario conectado');

  client.on('disconnect', () => {
    console.log('Usuario Desconectado');
  });


  /* Escuchar el cliente */

  client.on('sendMessage', (payload) => {
    client.broadcast.emit('reciveMessage', payload);
    client.emit('reciveMessage', payload);

    console.log(payload);
  });
});

// ChatRouter.routesConfig(app);

server.listen(config.port, () => {
  console.log('\x1b[34m', `Application listening at port ${config.port}`, '\x1b[0m');
});
