var Gpio = require('onoff').Gpio;
/*
var iv = setInterval(function(){
    	led.writeSync(led.readSync() === 0 ? 1 : 0);
}, 500);
      
// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    led.writeSync(0);  // Turn LED off.
    led.unexport();    // Unexport GPIO and free resources
}, 5000);
*/
module.exports = function(){

	var led = new Gpio(17, 'out');
	
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
