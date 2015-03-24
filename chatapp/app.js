var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// basic routing
app.get('/', function(req, res){
	console.log('home page');
	res.sendFile(__dirname+'/index.html');
});

var server = http.listen(8080, function(){
        console.log('server listening on port 8080');
});

var users = new Array();

io.on('connection', function(socket){
    console.log('user is connected at: '+ socket.id);

    socket.on('addUser', function(username){
		console.log('user:'+ username);
		users.push(username);
		// add the client's username to the global list
		socket.username = username;
		// echo to client they've connected
		io.emit('updatechat', 'SERVER', username + ' has connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		// update the list of users in chat, client-side
		io.emit('updateusers', users);
	});
	
	socket.on('chat message', function(msg){
		console.log('Message:'+ msg);
		if(msg!=""){
			io.emit('chat message', socket.username+':'+msg);
		}else{
			io.emit('error', "Empty message");
		}
	});	

	socket.on('disconnect', function(){
    	console.log('user disconnected');
    	delete users[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', users);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  	});
});

