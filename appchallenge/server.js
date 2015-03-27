var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);;

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


var server = http.listen(8080,function(){
	console.log("Server listening on port 8080");
});

function User(data){
    this.username = data;
    this.userMailID = data+"@google.com";
    this.available = 'available';

    this.getUserInfo =  function(){
        return "userName: " + this.username + " emailID:" + this.userMailID + " available: " + this.available;
    };

}

function Room(roomName){
    this.users = new Array();
    this.count = 0;
    this.roomName = roomName;

    this.addUser = function(data){
        console.log(data);
        this.users.push(data);
        this.count++;
    };
}

var usersList = new Array();
var roomsList = new Array();

io.on('connection', function(socket){
    console.log('user is connected at: '+ socket.id);

        var status;

        socket.on('addUser', function(username){
            console.log('user:'+ username);
            var user = new User(username);
            usersList.push(user);
            console.log(user.getUserInfo());
            // add the client's username to the global list
            socket.currentUser = user;
            // echo to client they've connected
            socket.emit('update', username + ' has connected');
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('statusUpdate', username + ' has connected');
            // update the list of users in chat, client-side
            socket.emit('updateUsers', JSON.stringify(user));
        });

        socket.on('getAllRooms', function(){
            console.log("Returning all rooms details");

            if(roomsList.length==0){
                status = false;
                console.log("No rooms available");
            }else{
                status = true;
            }
            socket.emit('updateRooms', status, JSON.stringify(roomsList));
            socket.broadcast.emit('updateRooms', status, JSON.stringify(roomsList));    
        });

        socket.on('addRoom', function(roomName){
            console.log("Room: "+ roomName);
            var room = new Room(roomName);
            console.log(room);
            room.addUser(socket.currentUser);
            roomsList.push(room);
            status = true;  // room created
            socket.emit('updateRooms', status, JSON.stringify(roomsList));
            socket.broadcast.emit('updateRooms', status, JSON.stringify(roomsList));

            socket.emit('update', roomName + ' has been created');
        });

        socket.on('getRoomDetails', function(){
            console.log("Getting Room Details");
            $(roomsList).each(function(key, value) {
                if(app.locals.roomID == key){
                    console.log("found room details");
                }
            });
        });

        socket.on('disconnect', function(){
                console.log('user disconnected');
        });
});
