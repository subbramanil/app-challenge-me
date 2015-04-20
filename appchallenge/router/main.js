// var server = require('../server.js');
var dao = require('../userDao.js');

module.exports = function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/index');
	});

	app.get('/index', function(req, res){
		res.render('index.html');
	});

	app.get('/basic', function(req, res){
		res.render('basic.html');
	});
	
	app.get('/rooms/:roomID', function(req, res){
		//Render dynamic files
		var data = {"roomID":req.params.roomID};
		var roomDetails = dao.findRoom(data);
		console.log(roomDetails);
		res.render('home.html', {roomDetails:JSON.stringify(roomDetails)});
	});

	//app.get('/rooms/:roomID', function(req, res){
	//	var data = {"roomID":req.params.roomID};
	//	console.log(data);
	//	// var roomDetails = getRoomDetails(data)
	//	var roomDetails = dao.findRoom(data);
	//	console.log(roomDetails);
	//	// app.locals.roomID = req.query.key;
	//	res.render('rooms.html');
	//});
}
