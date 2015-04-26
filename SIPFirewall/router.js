module.exports = function(app, cors)
{
	var corsOptions = {
  		origin: 'http://localhost:3030'
	};	
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});

	app.get('/home', cors(corsOptions), function(req, res){
		console.log("Loading Index Page..");
		res.render('index.html');
	});

	app.get('/views/login', function(req, res){
		console.log("Loading Login Page..");
		res.render('login.html');
	});

    /*app.get('/views/home', function(req, res){
        console.log("Loading Home Page..");
        res.render('home.html');
    });*/

	app.get('/views/register', function(req, res){
		console.log("Loading Register Page..");
		res.render('register.html');
	});

}
