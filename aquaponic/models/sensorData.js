/**
 * Created by Subbu on 6/6/15.
 */

var mongoose = require('mongoose');

var schema = mongoose.schema();

var sensorData = {
    sensorID: {
        type: Number
    },
    sensorValue: {
        type: Number
    },
    timestamp: {
        type: Date
    }
};

module.exports = mongoose.model('sensor', sensorData);