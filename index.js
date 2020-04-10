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
  socket.emit('newclientconnect', { description: 'Hey, welcome!' });
  socket.broadcast.emit('newclientconnect', {
    description: 'New user connected!',
  });

  socket.on('chat', function (data) {
    data.message && data.handle && io.sockets.emit('chats', data);
  });

  socket.on('typing', function (data) {
    socket.emit('typing', { description: '', msg: true });
    socket.broadcast.emit('typing', data);
  });
});
