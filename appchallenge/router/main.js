module.exports=function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/index');
	});

	app.get('/index', function(req, res){
		res.render('index.html');
	});
	
	app.get('/home/?', function(req, res){
		//Render dynamic files
		console.log(req.query.key);
		app.locals.roomID = req.query.key;
		res.render('home.html');
		//render static files using sendFile
		//res.sendFile('./static/home.html');
	});

	app.get('/rooms', function(req, res){
		res.render('rooms.html');
	});
}
