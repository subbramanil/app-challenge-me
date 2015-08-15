var Gpio = require('onoff').Gpio;
var led = new Gpio(17, 'out');

module.exports = function(app){
	app.get("/", function(req, res){
		console.log("app root loaded");
		res.redirect("/home");
	});

	app.get("/home", function(req, res){
		console.log("loading home page");
		console.log("router: status: ", getStatus());
		res.render("index.html");
	});

	app.get("/getStatus", function(req, res){
		console.log("LED current status: ",getStatus());
		res.send(getStatus());
	});

	app.get("/setStatus/:state", function(req, res){
		var state = req.params.state;
		console.log("received : ", state);
		var result = toggleStatus(state);
		res.send(getStatus());
	});

        var getStatus = function(){
		var status = led.readSync();
	        console.log("raspController: led status: ", status);
	        return (status === 0 ? false : true);
	};

        var toggleStatus = function(state){
		console.log("raspController: led status before: ", state);
	        led.writeSync((state !== 'false')? 1 : 0);
	        console.log("raspController: led status after: ", led.readSync());
	};
};
