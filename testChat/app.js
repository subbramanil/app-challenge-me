var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.set('views',__dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.use(express.static(__dirname + '/static'));

// //require('./router/main')(app);

// basic routing
app.get('/', function(req, res){
	console.log('home page');
	res.sendFile(__dirname+'/index.html');
});

var server = http.listen(8080, function(){
        console.log('server listening on port 8080');
});

io.on('connection', function(socket){
    console.log('user is connected at: '+ socket.id);
	
	socket.on('chat message', function(msg){
		console.log('Message:'+ msg);
		if(msg!=""){
			io.emit('chat message', msg);
		}else{
			io.emit('error', "Empty message");
		}
	});	

	socket.on('disconnect', function(){
    		console.log('user disconnected');
  	});
});

