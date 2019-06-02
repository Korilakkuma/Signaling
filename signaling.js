'use strict';

const WebSocketServer = require('ws').Server;
const port = (process.argv[2] > 0) && (process.argv[2] <= 65535) ? process.argv[2] : 3000;

const ws = new WebSocketServer({ port });

console.log(`Wait port (${port}) ...`);

const sockets = [];

ws.on('connection', (socket) => {
  sockets.push(socket);

  socket.on('message', (message) => {
    ws.clients.forEach((client) => {
      if (socket !== client) {
        client.send(message);
      } else {
        console.log('--- Skip Sender ---');
      }
    });
  });
});
