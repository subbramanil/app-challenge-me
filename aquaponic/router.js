var dao = require('./dao.js');

module.exports = function(app, cors)
{
	var corsOptions = {
  		origin: 'http://localhost:3030'
	};	
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});

	/*app.get('/home', cors(corsOptions), function(req, res){
		console.log("Loading Home Page..");
		res.render('index.html');
	});*/

    app.get('/home', function(req, res){
        console.log("Loading Home Page..");
        res.render('index.html');
    });

	app.get('/views/dashboard', function(req, res){
		console.log("Loading Dashboard Page..");
        dao.getAllSensors(function (err, data) {
            if(err)
                console.log("Error in DB access");
            console.log(data);
        });
        dao.getTempData(function (err, data) {
            if(err)
                console.log("Error in DB access");
            console.log(data);
        });
		res.render('dashboard.html');
	});

	app.get('/views/rules', function(req, res){
		console.log("Loading rules Page..");
		res.render('rules.html');
	});

	app.get('/views/history', function(req, res){
		console.log("Loading history Page..");
		res.render('history.html');
	});

	app.get('/views/login', function(req, res){
		console.log("Loading login Page..");
		res.render('login.html');
	});

};
