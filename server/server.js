const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server); //socketIO listen to the server
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from :'John',
    text: 'See you then',
    createAt: 123123
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('createMessage', (message) => {
    console.log('create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    })
  });


  socket.on('disconnect', ()=>{
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`server running on port ${port}`);
})
