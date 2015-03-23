module.exports=function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});
	
	app.get('/home', function(req, res){
		//Render dynamic files
		res.render('home.html');
		//render static files using sendFile
		//res.sendFile('./static/home.html');
	});
}
