var dao = require('../server.js');

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
	
	app.get('/home/?', function(req, res){
		//Render dynamic files
		console.log(req.query.key);
		app.locals.roomID = req.query.key;
		res.render('home.html');
		//render static files using sendFile
		//res.sendFile('./static/home.html');
	});

	app.get('/rooms/:roomID', function(req, res){
		console.log(req.param.roomID);
		var data = {"roomID":req.param.roomID};
		var roomDetails = getRoomDetails(data)
		console.log(roomDetails);
		// app.locals.roomID = req.query.key;
		res.render('rooms.html');
	});
}
