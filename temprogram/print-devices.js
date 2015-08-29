#!/usr/bin/env node

//
// This is a simple application that requests the list
// of available devices for the provided API Key and then
// prints the details for each of those devices
//

var config = require("./config");
var M2X = require("m2x");
var m2xClient = new M2X(config.api_key);

/*m2xClient.devices.list(function(response) {
    if (response.isSuccess()) {
        response.json.devices.forEach(function(device) {
            console.log(device);
        });
    } else {
        console.log(response.error());
    }
});*/

m2xClient.devices.streams(config.device, function(response) {
    if (response.isSuccess()) {
            var streamlist=JSON.parse(response.raw).streams;
            console.log(streamlist);
            console.log(streamlist[0].value);
     
    } else {
        console.log(response.error());
    }
});

m2xClient.devices.streamValues(config.device, 'temperature', function(response) {
    if (response.isSuccess()) {
            var datalist=JSON.parse(response.raw).values;
            console.log(datalist);
         
     
    } else {
        console.log(response.error());
    }
});