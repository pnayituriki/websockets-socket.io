var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var sever = app.listen(4000, function () {
  console.log('Listening to request 4000 port');
});

// Static file
app.use(express.static('public'));

// Socket setup
var io = socket(sever);

io.on('connection', function (socket) {
  console.log('made socket connection', socket.id);

  socket.on('chat', function (data) {
    io.sockets.emit('chats', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});
