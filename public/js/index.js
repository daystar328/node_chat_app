var socket = io();
socket.on('connect', function() {

  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Server disconnected');
})


socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})



socket.on('newEmail', function(email) {
  console.log('New email', email);
});

socket.emit('createMessage', {
  from:'Tom',
  text:'Hi'
}, function(data) {
  console.log('Got it', data);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    form: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
