var express=require('express');
var app=express();
var routes=require('./routes');
var config = require("./config");
var M2X = require("m2x");
var m2xClient = new M2X(config.api_key);

app.set('view engine','ejs');
app.locals.pagetitle="Website ";

app.get('/', routes.index);
app.get('/about', routes.about);
app.use(express.static('public'));



app.get('/devices',function(req, res){
	 m2xClient.devices.list(function(response) {
     if (response.isSuccess()) {
        response.json.devices.forEach(function(device) {
        	res.render('devicepage',{
		    title:'Devices Home',
		    classname:'Device',
		    devicename: device.name,
		    devicestatus:device.status,
		    deviceupdatetime:device.updated
	});
        });
    } else {
        console.log(response.error());
    }
});
	      });

app.get('/devices/data',function(req, res){
	m2xClient.devices.streamValues(config.device, 'temperature', function(response) {
    if (response.isSuccess()) {
            var datalist=JSON.parse(response.raw).values;
            res.render('temprogram',{
		    title:'TI-101',
		    comment:'The first version of data streaming',
		    classname:'TI',
		  users:datalist
	});
         
     
    } else {
        console.log(response.error());
    }
});
	      });

app.get('/:name?/:title?', function(req,res){
	var name=req.params.name;
	var title=req.params.title;
	res.send('<H1>Hello</H1>'+name+", "+title+" was here");
})

app.get('*', function(req,res){
	res.send('bad route');
})

var server=app.listen(3000, function (){
	console.log('Listening on port 3000');
})