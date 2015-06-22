/**
 * Created by Subbu on 6/6/15.
 */

var mongo = require('./mongodao.js');

module.exports = function(router, cors) {

    router.get('/sensors', function (req, res) {
        console.log("rest.getSensorData() entry");
        var query = {};

        if(req.query.sensorID){
            query.sensor = req.query.sensor;
        }

        mongo.getSensorData(query, function (error, sensor) {
            if(error)
                res.status(500);
            else
                res.json(sensor);
        });

        console.log("rest.getSensorData() exit");
    });
};
