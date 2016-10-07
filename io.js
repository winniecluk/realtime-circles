// io now represents our socket.io server
var io = require('socket.io')();


// socket represents client that will be coming in and connecting
// Listen for new connections from clients (socket)
io.on('connection', function (socket) {
    //listening for first-time connection from client
  console.log('client connected!');
  socket.on('add-circle', function (data) {
    // io is the server
    // send to all connected clients on that server
    io.emit('add-circle', data);
  });
  socket.on('clear-circles', function(){
    console.log('client clicked clear!');
    io.emit('clear-circles');
  });
});



// io represents socket.io on server
module.exports = io;
