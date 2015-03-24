var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./router/main')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));

var oneDay = 86400000;
// app.use(express.compress());
app.use(express.static(__dirname + '/static',{maxAge: oneDay}));


var server=http.listen(8080,function(){
	console.log("Server listening on port 8080");
});

io.on('connection', function(socket){
    console.log('user is connected at: '+ socket.id);

        // socket.on('chat message', function(msg){
        //         console.log('Message:'+ msg);
        //         if(msg!=""){
        //                 io.emit('chat message', msg);
        //         }else{
        //                 io.emit('error', "Empty message");
        //         }
        // });

        socket.on('addUser', function(username){
        	console.log("User:"+ username);
        });

        socket.on('disconnect', function(){
                console.log('user disconnected');
        });
});
