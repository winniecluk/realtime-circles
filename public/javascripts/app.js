document.addEventListener("DOMContentLoaded", function() {

  // this is client's connection w/ server
  var socket = io();
  // hey client, listen for add-circle
  socket.on('add-circle', function (data) {
    addCircle(data);
  });
  socket.on('update-player-list', function(data){
    var playerList = '<li>' + data.join('</li><li>') + '</li>';
    players.innerHTML = playerList;
  });


  var circles = document.getElementById('circles');
  var players = document.getElementById('players');
  var initials = '';

  circles.addEventListener('click', function(evt) {
   // send this to the server
    socket.emit('add-circle', {
      initials: data.initials,
      x: evt.clientX,
      y: evt.clientY,
      dia: randomBetween(10,100),
      rgba: getRandomRGBA()
    });
  });

// clear function
  document.getElementsByTagName('button')[0].addEventListener('click', function(evt) {
    socket.emit('clear-circles');
  });

  socket.on('clear-circles', function(){
    circles.innerHTML = '';
  });


  do {
    initials = getInitials();
  } while (initials.length < 2 || initials.length > 3);
  socket.emit('register-player', {initials: initials});


  function getInitials() {
    var input = prompt("Please enter your initials");
    return input ? input.toUpperCase() : '';
  }

  function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    // to center text in circle
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = initials;
    circles.appendChild(el);
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
  }

});
