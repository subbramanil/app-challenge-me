/**
 * Created by Subbu on 6/6/15.
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/aquaponics/');
var sensorData = require('./models/sensorData');

module.exports =
{
    getAllSensors : function(callback){
        console.log("dao.getAllSensors() entry");
        sensorData.find(function(err, sensors) {
            if(err)
                console.error("Error in DB access");
            else{
                console.log(sensors);
            }
        });
        console.log("dao.getAllSensors() exit");
        //return sensors;
    },
    getSensorData : function(query, callback){
        console.log("dao.getSensorData() entry");
        sensorData.find(query, function (err, sensor) {
            if(err)
                return callback(err);
            else
                return callback(null, sensor);
        });
        console.log("dao.getSensorData() exit");
    }

};