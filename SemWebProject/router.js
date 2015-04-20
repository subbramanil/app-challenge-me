module.exports = function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('/home', function(req, res){
		console.log("Loading Home Page..");
		res.render('index.html');
	});

	app.get('/views/dashboard', function(req, res){
		console.log("Loading Dashboard Page..");
		res.render('dashboard.html');
	});

	app.get('/views/surgeryTypes', function(req, res){
		console.log("Loading surgery Page..");
		res.render('surgeryTypes.html');
	});

	app.get('/views/infrastructure', function(req, res){
		console.log("Loading infrastructure Page..");
		res.render('infrastructure.html');
	});

	app.get('/views/patients', function(req, res){
		console.log("Loading patients Page..");
		res.render('patient.html');
	});
}