var express = require('express');
var app = express();
var static = require('node-static');
var file = new(static.Server)();
var http = require('http');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// require('./router/main')(app);

// app.set('views',__dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// var oneDay = 86400000;
// // app.use(express.compress());
// app.use(express.static(__dirname + '/static',{maxAge: oneDay}));



var appServer = http.createServer(function (req, res) {
	console.log("server is created");
	file.serve(req, res);
}).listen(2015);

// appServer.get('/call', function(req, res){
// 	res.render('CallScreen.html');
// });