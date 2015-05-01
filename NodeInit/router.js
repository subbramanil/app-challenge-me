// var dao = require('./userDao.js');
module.exports = function(app, cors)
{
	// var corsOptions = {
 //  		origin: 'http://localhost:3030'
	// };	
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});

	app.get('/home', function(req, res){
		console.log("Loading Index Page..");
		res.render('index.html');
	});

}
