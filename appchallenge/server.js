var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

require('./router/main')(app);
var dao = require('./userDao.js');

// app.configure(function(){
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
// });

var server = http.listen(8080,function(){
	console.log("Server listening on port 8080");
});

var statusType = {
    INFO : 1,
    UPDATE : 2,
    ERROR : 3
};

function statusMsg(flag, msg, msgType){
    this.status = flag;
    this.msg = msg;
    this.msgType = msgType;
}


io.on('connection', function(socket){
    console.log('user is connected at: '+ socket.id);

        var status;

        socket.on('addUser', function(userData){
            console.log("server.addUser() entry");
            var user = dao.addUser(userData);
            // add the client's username to the global list
            socket.currentUser = user;
            // echo to client they've connected
            // socket.emit('update', user.name + ' has connected');
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('statusUpdate', user.userName + ' has connected');
            // update the list of users in chat, client-side
            socket.emit('updateUsers', JSON.stringify(user));
            console.log("server.addUser() exit");
        });

        socket.on('getAllRooms', function(){
            console.log("server.getAllRooms() entry");
            var rooms = dao.getAllRooms();
            if(rooms.length!=0)
                status = true;
            else
                status = false;
            socket.emit('updateRooms', status, JSON.stringify(rooms));
            socket.broadcast.emit('updateRooms', status, JSON.stringify(rooms));    
            console.log("server.getAllRooms() exit");
        });

        socket.on('addRoom', function(roomData){
            console.log("server.addRoom() entry");
            var roomsList = dao.addRoom(roomData, socket.currentUser);
            socket.emit('updateRooms', true, JSON.stringify(roomsList));
            socket.broadcast.emit('updateRooms', true, JSON.stringify(roomsList));
            socket.emit('statusUpdate', roomData.roomName + ' has been created');
            console.log("server.addRoom() exit");
        });

        // socket.on('getRoomDetails', function(){
        //     console.log("getRoomDetails() entry");
        //     $(roomsList).each(function(key, value) {
        //         if(app.locals.roomID == key){
        //             console.log($(roomsList).get(key));
        //             var room = $(roomsList).get(key);
        //             console.log(room);
        //         }
        //     });
        //     console.log("getRoomDetails() exit");
        // });

        socket.on('joinRoom', function(data){
            console.log("server.joinRoom() entry");
            console.log(data);
            var room = dao.joinRoom(data);
            console.log(room);
            socket.emit("updateUserCount", JSON.stringify(room));
            socket.broadcast.emit("updateUserCount", JSON.stringify(room));
            console.log("server.joinRoom() exit");
        });

        socket.on('disconnect', function(){
            console.log("server.disconnect() entry");
            console.log('user disconnected');
            console.log("server.disconnect() exit");
        });
});
