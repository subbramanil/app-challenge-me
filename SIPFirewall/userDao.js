var fs = require("fs");
var dirName = "/etc/asterisk/";
var fileName = dirName+"sip.conf";

module.exports = {

    addUser : function(){
        console.log("dao.addUser() entry");
	fs.exists(fileName, function(exists) {
  		if (exists) {
    			fs.stat(fileName, function(error, stats) {
        			fs.writeFile(fileName,"test", function (err) {
                			if (err) return console.log(err);
                			console.log('testing');
        			});
      				fs.open(fileName, "r", function(error, fd) {
        			var buffer = new Buffer(stats.size);

        			fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          				var data = buffer.toString("utf8", 0, buffer.length);

          				console.log(data);
          				fs.close(fd);
        			});
      				});
    			});
  		}else{
        		console.log("file not found");
  		}
	});
	console.log("dao.addUser exit");
    }
}; 
