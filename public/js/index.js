var socket = io();
socket.on('connect', function() {

  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Server disconnected');
})


socket.on('newMessage', function(message) {
  console.log('newMessage', message);
})



socket.on('newEmail', function(email) {
  console.log('New email', email);
});
