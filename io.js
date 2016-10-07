// io now represents our socket.io server
var io = require('socket.io')();

var players = {};

// socket represents client that will be coming in and connecting
// Listen for new connections from clients (socket)
io.on('connection', function (socket) {
  socket.on('register-player', function(data){
    players[data.initials] = true;
    // socket lives in memory, interally holding this in sockets array
    socket.initials = data.initials;
    // static method on Object called keys, returns array of keys in object
    io.emit('update-player-list', Object.keys(players)
    );
  });

  socket.on('disconnect', function(data){
    // removes properties from object
    delete players[socket.initials];
    io.emit('update-player-list'), Object.keys(players);
  });

    //listening for first-time connection from client
  socket.on('add-circle', function (data) {
    // io is the server
    // send to all connected clients on that server
    io.emit('add-circle', data);
  });
  socket.on('clear-circles', function(){
    io.emit('clear-circles');
  });
});



// io represents socket.io on server
module.exports = io;
