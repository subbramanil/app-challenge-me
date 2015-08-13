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

	app.get("/setStatus/:cmd", function(req, res){
		var cmd = req.params.cmd;
		console.log("LED current Status: ", getStatus());
		console.log("received command: ", cmd);
		setStatus(cmd);
		res.send("LED Status: "+getStatus());
	});

        var getStatus = function(){
		var status = led.readSync();
	        console.log("raspController: led status: ", status);
	        return (status === 0 ? "off" : "on");
	};

        var setStatus = function(cmd){
		console.log("raspController: received command: ", cmd);
	        led.writeSync((cmd === "on")? 1 : 0);
	        console.log("raspController: led status: ", led.readSync());
	};
};
