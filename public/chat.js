// Make connection
var socket = io.connect('http://localhost:4000/');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
  message.value = '';
});

message.addEventListener('keypress', function () {
  socket.emit('typing', {
    description: handle.value + ' is typing...',
    msg: false,
  });
});

// Listen for events
socket.on('chats', function (data) {
  feedback.innerHTML = '';
  !data.msg && (message.disabled = false);
  output.innerHTML +=
    '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data.description + '</em></p>';

  data.msg ? (message.disabled = false) : (message.disabled = true);
});

socket.on('newclientconnect', function (data) {
  feedback.innerHTML = '<p><em>' + data.description + '</em></p>';

  setTimeout(function () {
    feedback.innerHTML = '';
  }, 4000);
});
