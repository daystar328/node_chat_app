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
    from: 'David',
    text: 'welcome to the chat app'
  });

  socket.broadcast.emit('newMessage',{
    from: 'David',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })



  socket.on('createMessage', (message) => {
    console.log('create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });


  socket.on('disconnect', ()=>{
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`server running on port ${port}`);
})
