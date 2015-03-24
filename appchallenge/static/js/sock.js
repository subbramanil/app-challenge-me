
var socket = io();
socket.on('connect', function() {
  console.log('connected');
  socket.emit('adduser', prompt("What's your name?"));
});
socket.on('disconnect', function() {
  console.log('disconnected');
});
$('form').submit(function(){
    var msg = $('#m').val();
    socket.emit('chat message', msg);
    $('#m').val('');
    return false;
});


socket.on('error', function(error){
  console.log("error: "+error);
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

