import { run } from './oscReceiver';
import { OscMessage } from './oscTypes';
const express = require('express');

const app = require('express')();

app.use(express.static('public'))

const http = require('http').Server(app);
const io = require('socket.io')(http);


// const server = require('http').createServer();
// const io = require('socket.io')(server);

const handleMessage = (oscMsg: OscMessage) => {
  const { address } = oscMsg;
  // console.log('address', address, oscMsg);

  io.emit('data', { oscMsg })
}


run(handleMessage);

// @ts-ignore
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
