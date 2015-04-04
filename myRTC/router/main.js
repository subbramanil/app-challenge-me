module.exports=function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/index');
	});

	app.get('/index', function(req, res){
		res.render('index.html');
	});
}
